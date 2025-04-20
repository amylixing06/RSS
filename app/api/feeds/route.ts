import { NextResponse } from "next/server"
import type { FeedItem } from "@/types/feed"
import { XMLParser } from "fast-xml-parser"

// Helper function to extract text content from XML element
function getTextValue(obj: any, path: string): string | undefined {
  const parts = path.split(".")
  let current = obj

  for (const part of parts) {
    if (!current || typeof current !== "object") return undefined
    current = current[part]
  }

  return typeof current === "string" ? current : undefined
}

// Helper function to extract image from feed item
function extractImage(item: any): string | undefined {
  // Try media:content
  if (item["media:content"] && item["media:content"]["@_url"]) {
    return item["media:content"]["@_url"]
  }

  // Try enclosure
  if (item.enclosure && item.enclosure["@_url"] && item.enclosure["@_type"]?.startsWith("image/")) {
    return item.enclosure["@_url"]
  }

  // Try to extract from content or description
  const content = item["content:encoded"] || item.content || item.description
  if (content && typeof content === "string") {
    // Simple regex to extract image URL from HTML content
    const imgMatch = content.match(/<img[^>]+src="([^">]+)"/i)
    if (imgMatch && imgMatch[1]) {
      return imgMatch[1]
    }
  }

  return undefined
}

// Helper function to extract favicon
function getFaviconUrl(feedUrl: string): string {
  try {
    const url = new URL(feedUrl)
    return `${url.protocol}//${url.hostname}/favicon.ico`
  } catch (error) {
    return ""
  }
}

// Helper function to clean HTML from text
function stripHtml(html: string): string {
  if (!html) return ""
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim()
}

// Parse RSS feed
async function parseFeed(feedUrl: string): Promise<FeedItem[]> {
  try {
    // Add custom headers to mimic a browser request
    const headers = {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.5",
      Referer: "https://www.google.com/",
    }

    // Use fetch API with custom headers
    const response = await fetch(feedUrl, { headers })

    if (!response.ok) {
      throw new Error(`Failed to fetch feed: ${response.status} ${response.statusText}`)
    }

    const text = await response.text()

    // Parse XML using fast-xml-parser
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_",
      isArray: (name) => ["item", "entry"].includes(name),
    })

    try {
      const result = parser.parse(text)

      // Determine if it's RSS or Atom
      const isRSS = !!result.rss || !!result.feed

      if (!isRSS) {
        throw new Error("Not a valid RSS or Atom feed")
      }

      // Get the channel/feed info
      const channel = result.rss?.channel || result.feed
      if (!channel) {
        throw new Error("Could not find channel or feed element")
      }

      // Get feed title
      const feedTitle = channel.title || new URL(feedUrl).hostname

      // Get items (works for both RSS and Atom)
      const items = channel.item || channel.entry || []

      if (!Array.isArray(items) || items.length === 0) {
        return []
      }

      const feedItems: FeedItem[] = items.map((item: any) => {
        // Get item properties
        const title = item.title || "Untitled"
        const description = item.description || item.summary
        const content = item["content:encoded"] || item.content
        const link = item.link?.["@_href"] || (typeof item.link === "string" ? item.link : undefined)
        const pubDate = item.pubDate || item.published || item.date
        const guid = item.guid || item.id || link

        // Extract image
        const image = extractImage(item)

        return {
          id: guid || `${feedTitle}-${title}`,
          title: typeof title === "object" ? JSON.stringify(title) : title,
          description: description ? stripHtml(description) : undefined,
          content: typeof content === "string" ? content : undefined,
          link,
          pubDate: typeof pubDate === "string" ? pubDate : undefined,
          image,
          source: typeof feedTitle === "string" ? feedTitle : "Unknown Source",
          favicon: getFaviconUrl(feedUrl),
        }
      })

      return feedItems
    } catch (parseError) {
      console.error("XML parsing error:", parseError)
      throw new Error("Failed to parse feed XML")
    }
  } catch (error) {
    console.error(`Error parsing feed ${feedUrl}:`, error)
    return []
  }
}

// 当前API路由已禁用，以解决应用加载问题
export async function POST(request: Request) {
  try {
    console.log("API已临时禁用，正在返回维护信息")
    
    // 返回维护信息
    return NextResponse.json({ 
      status: "maintenance", 
      message: "系统当前处于维护状态，API暂时不可用。请稍后再试。" 
    }, { status: 503 })
  } catch (error) {
    console.error("API错误:", error)
    return NextResponse.json(
      { error: "服务暂时不可用" },
      { status: 500 }
    )
  }
}

