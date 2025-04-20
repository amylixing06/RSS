'use client'

import { Suspense, useState, useEffect } from "react"
import FeedVisualizer from "@/components/feed-visualizer"
import SettingsPanel from "@/components/settings-panel"
// import AnalyticsTest from "@/components/analytics-test"
import { FeedProvider } from "@/context/feed-context"

export default function Home() {
  // 客户端渲染安全措施
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])

  // 渲染加载状态
  const LoadingComponent = () => (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="text-center">
        <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
        <div className="text-2xl font-medium">加载应用中...</div>
      </div>
    </div>
  )

  if (!isClient) {
    return <LoadingComponent />
  }

  return (
    <FeedProvider>
      <main className="relative min-h-screen bg-background">
        <Suspense fallback={<LoadingComponent />}>
          <FeedVisualizer />
          <SettingsPanel />
          {/* <AnalyticsTest /> */}
        </Suspense>
      </main>
    </FeedProvider>
  )
}

