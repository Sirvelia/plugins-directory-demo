import { Skeleton } from "./ui/skeleton"

export const SkeletonGrid = () => {
  return (
    <div className="px-[20px] md:px-[80px] mt-[20px]">
      <div className="max-w-[1160px] mx-auto grid md:grid-cols-2 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="w-full h-[210px]" />
      ))}
      </div>
    </div>
  )
}