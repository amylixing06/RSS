'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  // 简单的客户端渲染检测
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="max-w-lg text-center">
        <h1 className="text-3xl font-bold mb-6">RSSence - RSS订阅源可视化工具</h1>
        
        <p className="mb-6 text-lg">
          欢迎使用RSSence，您的RSS订阅源可视化工具。我们正在进行系统维护，以改善您的体验。
        </p>
        
        <p className="mb-8 text-muted-foreground">
          目前我们暂时停用了PWA功能以修复一些加载问题。
          请尝试清除您的浏览器缓存和Cookie，然后再次访问本站。
        </p>
        
        <div className="space-y-4">
          <Button onClick={() => window.location.reload()} className="w-full">
            刷新页面
          </Button>
          
          <Button variant="outline" asChild className="w-full">
            <Link href="https://github.com/silveralcid/rssence">
              访问项目GitHub
            </Link>
          </Button>
        </div>
      </div>
    </main>
  )
}

