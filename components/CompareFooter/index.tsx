'use client'

import { useCompareStore } from "@/stores/compareStore"
import { Button } from "../ui/button"
import { Eye, X } from "lucide-react"
import { decode } from "html-entities"
import Link from "next/link"
import { useRouter } from "next/navigation"

export const CompareFooter = () => {
    const { isComparing, setIsComparing, plugins, clearPlugins, removePlugin } = useCompareStore()
    const router = useRouter()

    if (!isComparing) return null

    const handleCancel = () => {
        setIsComparing(false)
        clearPlugins()
    }

    const handleCompare = () => {
        setIsComparing(false)
        clearPlugins()
        router.push(`/compare?plugins=${plugins.map((plugin) => plugin.slug).join(',')}`)
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white py-[20px] px-[20px] md:px-[80px] border-t space-y-2">
            <div className="flex items-center justify-between max-w-[1160px] mx-auto">

                <span className="text-[14px] font-[400] font-medium">Select plugins to compare</span>

                <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={handleCancel}>
                        <X />
                        Cancel
                    </Button>

                    <Button variant="default" disabled={plugins.length < 2} onClick={handleCompare}>
                        Compare plugins
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-[1160px] mx-auto">
                {plugins.map((plugin) => (
                    <div key={plugin.slug} className="flex items-center gap-2 p-[10px] rounded-lg bg-neutral-50 border border-neutral-200 justify-between">
                        <img className="w-[40px] h-[40px]" src={Object.values(plugin.icons).pop() as string} alt={plugin.name} />
                        <p className="line-clamp-2">{decode(plugin.name)}</p>
                        <Button variant="outline" onClick={() => removePlugin(plugin)}>
                            <X />
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    )
}