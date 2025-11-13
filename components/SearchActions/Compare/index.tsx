'use client'

import { Button } from "@/components/ui/button"
import { Columns3 } from "lucide-react"
import { useCompareStore } from "@/stores/compareStore"

export const Compare = () => {
    const { isComparing, setIsComparing, clearPlugins } = useCompareStore()

    const handleCompare = () => {
        setIsComparing(!isComparing)
        
        if (!isComparing) {
            clearPlugins()
        }
    }

    return (
        <Button variant={isComparing ? "default" : "outline"} onClick={handleCompare}>
            <Columns3 />
            Compare
        </Button>
    )
}