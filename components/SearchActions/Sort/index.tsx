'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'

import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { SortAsc } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export const Sort = () => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    
    const [sort, setSort] = useState<string>('none')
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const sortParam = searchParams.get('sort')
        if (sortParam) {
            setSort(sortParam)
        }
    }, [searchParams])

    const handleApplySort = () => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('sort', sort)
        router.push(`${pathname}?${params.toString()}`)
        setOpen(false)
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline">
                    <SortAsc className="w-5 h-5" />
                    Sort
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
                <div className="space-y-4">
                    <div>
                        <h3 className="font-semibold text-base mb-1">Sort Plugins</h3>
                        <p className="text-sm text-muted-foreground">Choose how to sort the plugin results</p>
                    </div>

                    <div className="space-y-3">
                        <Label className="text-sm font-semibold">Sort By</Label>
                        <Select value={sort} onValueChange={setSort}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select sort option" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="none">Default</SelectItem>
                                <SelectItem value="recently-updated">Most recently updated</SelectItem>
                                <SelectItem value="older-updated">Updated longer ago</SelectItem>
                                <SelectItem value="best-ratings">Best ratings</SelectItem>
                                <SelectItem value="worst-ratings">Worst ratings</SelectItem>
                                <SelectItem value="most-active">Most active installations</SelectItem>
                                <SelectItem value="least-active">Least active installations</SelectItem>
                                <SelectItem value="newer-version">Tested with a newer version</SelectItem>
                                <SelectItem value="older-version">Tested with an older version</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex gap-2 pt-4 border-t">
                        <Button onClick={handleApplySort} className="flex-1">Apply Sort</Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}