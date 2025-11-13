import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="px-[20px] md:px-[80px] mt-[20px]">
      <div className="max-w-[1160px] mx-auto grid md:grid-cols-2 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-full border border-[#d9d9d9] flex flex-col justify-between p-[20px] rounded-[2px] space-y-4">
            
            <div className="space-y-4">
              {/* Icon and Title Section */}
              <div className="flex gap-4">
                <Skeleton className="w-[80px] h-[80px] rounded-sm" />
                
                <div className="flex-1 space-y-2">
                  {/* Plugin Name */}
                  <Skeleton className="h-[18px] w-[75%]" />
                  
                  {/* Star Rating */}
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, starIndex) => (
                      <Skeleton key={starIndex} className="w-4 h-4 rounded-sm" />
                    ))}
                    <Skeleton className="h-[14px] w-[45px] ml-1" />
                  </div>
                </div>
              </div>
              
              {/* Description */}
              <div className="space-y-2">
                <Skeleton className="h-[14px] w-full" />
                <Skeleton className="h-[14px] w-[90%]" />
                <Skeleton className="h-[14px] w-[70%]" />
              </div>
            </div>

            {/* Author Section */}
            <div className="flex items-center gap-2">
              <Skeleton className="w-4 h-4 rounded-sm" />
              <Skeleton className="h-[14px] w-[120px]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
