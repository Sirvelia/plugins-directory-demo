import { SearchInput } from "@/components/SearchInput"
import { CompareResults } from "@/components/CompareResults"
import { Suspense } from "react"
import { Loader2 } from "lucide-react"

export default function ComparePage() {


    return (
        <div className="pb-12">
            <div className="px-[20px] md:px-[80px] py-6">
                <div className="max-w-[1160px] mx-auto flex justify-start">
                    <SearchInput />
                </div>
            </div>

            <div className="px-[20px] md:px-[80px] mb-6">
                <div className="max-w-[1160px] mx-auto">
                    <h1 className="text-[18px] font-[600] leading-[1.2]">Compare plugins</h1>
                </div>
            </div>

            <Suspense fallback={
                <div className="p-6">
                    <div className="flex items-center justify-center h-full">
                        <Loader2 className="w-6 h-6 animate-spin" />
                    </div>
                </div>
            }>
                <CompareResults />
            </Suspense>
        </div>
    )
}