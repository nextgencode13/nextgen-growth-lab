import React from 'react'

interface SkeletonProps {
  className?: string
  style?: React.CSSProperties
}

export function Skeleton({ className = '', style }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-[8px] ${className}`}
      style={{ backgroundColor: 'var(--color-surface-card)', ...style }}
    />
  )
}

export function BookCardSkeleton() {
  return (
    <div
      className="rounded-[16px] overflow-hidden border"
      style={{ borderColor: 'var(--color-hairline)', backgroundColor: 'var(--color-canvas)' }}
    >
      <Skeleton style={{ height: '200px' }} className="rounded-none" />
      <div className="p-4 space-y-2">
        <Skeleton style={{ height: '16px', width: '75%' }} />
        <Skeleton style={{ height: '12px', width: '50%' }} />
        <Skeleton style={{ height: '12px', width: '60%' }} />
      </div>
    </div>
  )
}

export function StatCardSkeleton() {
  return (
    <div
      className="rounded-[12px] p-5 border"
      style={{ borderColor: 'var(--color-hairline)', backgroundColor: 'var(--color-canvas)' }}
    >
      <Skeleton style={{ width: '36px', height: '36px', borderRadius: '8px' }} className="mb-3" />
      <Skeleton style={{ height: '28px', width: '40%' }} className="mb-1" />
      <Skeleton style={{ height: '12px', width: '60%' }} />
    </div>
  )
}
