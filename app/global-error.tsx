'use client'

import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <div className="flex h-screen w-full items-center justify-center bg-background">
          <div className="text-center p-4">
            <h1 className="text-2xl font-bold mb-4">应用出现严重问题</h1>
            <p className="mb-4">很抱歉，应用加载过程中出现了严重错误。</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                刷新页面
              </button>
              <button 
                onClick={() => reset()}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
              >
                重试
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
} 