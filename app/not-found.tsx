import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-primary mb-4">
          404 - 页面未找到
        </h2>
        <p className="text-xl mb-8">
          您访问的页面不存在或已被移除。
        </p>
        <Link
          href="/"
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
        >
          返回首页
        </Link>
      </div>
    </div>
  )
} 