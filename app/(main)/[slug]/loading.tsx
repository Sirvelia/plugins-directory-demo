import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="pb-12">
      {/* Search Input Skeleton */}
      <div className="px-[20px] md:px-[80px] py-[clamp(0px,_5vw,_20px)]">
        <div className="max-w-[1160px] mx-auto flex justify-start">
          <Skeleton className="h-12 w-full max-w-md" />
        </div>
      </div>

      {/* Header Skeleton */}
      <div className="px-[20px] md:px-[80px] pb-[clamp(0px,_5vw,_20px)]">
        <div className="max-w-[1160px] mx-auto space-y-4">
          {/* Banner Skeleton */}
          <Skeleton className="w-full h-[300px] rounded-md" />

          {/* Icon, Title, and Author Skeleton */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Skeleton className="w-[96px] h-[96px] rounded-md" />
              <div className="space-y-2">
                <Skeleton className="h-7 w-64" />
                <Skeleton className="h-5 w-32" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs and Content Skeleton */}
      <div className="px-[20px] md:px-[80px] py-[clamp(0px,_5vw,_20px)]">
        <div className="max-w-[1160px] mx-auto">
          {/* Tabs Navigation Skeleton */}
          <div className="flex gap-2 mb-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-28" />
            ))}
          </div>

          {/* Tabs Content Grid */}
          <div className="grid grid-cols-12 gap-8">
            {/* Main Content Area (8 columns) */}
            <div className="col-span-8 pt-12 space-y-4">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <div className="pt-4 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>

            {/* Sidebar (4 columns) */}
            <div className="col-span-4 pt-12 space-y-6">
              <div className="space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
