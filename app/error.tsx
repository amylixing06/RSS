'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // 记录错误到控制台或错误跟踪服务
    console.error('应用发生错误:', error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-primary mb-4">
          很抱歉，出现了错误
        </h2>
        <p className="text-xl mb-8">
          应用加载过程中遇到问题。这可能是由于网络连接问题或应用更新导致的。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
          >
            刷新页面
          </button>
          <button
            onClick={() => reset()}
            className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground"
          >
            重试
          </button>
        </div>
      </div>
    </div>
  )
} 