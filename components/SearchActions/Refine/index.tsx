'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export const Refine = ({ results }: { results?: SearchResults }) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    
    const [latestWP, setLatestWP] = useState<boolean>(false)
    const [lastUpdated, setLastUpdated] = useState<string>('')
    const [popularity, setPopularity] = useState<string>('')
    const [rating, setRating] = useState<string>('')
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const latestWPParam = searchParams.get('latestWP')
        const lastUpdatedParam = searchParams.get('lastUpdated')
        const popularityParam = searchParams.get('popularity')
        const ratingParam = searchParams.get('rating')
        
        if (latestWPParam === 'true') {
            setLatestWP(true)
        }
        if (lastUpdatedParam) {
            setLastUpdated(lastUpdatedParam)
        }
        if (popularityParam) {
            setPopularity(popularityParam)
        }
        if (ratingParam) {
            setRating(ratingParam)
        }
    }, [searchParams])

    const handleApplyFilters = () => {
        if (!results?.search) return

        const params = new URLSearchParams()
        
        // Add refine filters
        if (latestWP) {
            params.set('latestWP', 'true')
        }
        if (lastUpdated) {
            params.set('lastUpdated', lastUpdated)
        }
        if (popularity) {
            params.set('popularity', popularity)
        }
        if (rating) {
            params.set('rating', rating)
        }
        
        // Add sort param if present
        const sortParam = searchParams.get('sort')
        if (sortParam) {
            params.set('sort', sortParam)
        }

        const queryString = params.toString()
        const url = `/search/${encodeURIComponent(results.search)}${queryString ? `?${queryString}` : ''}`
        router.push(url)
        setOpen(false)
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline">
                    <Filter className="w-5 h-5" />
                    Refine
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 max-h-[600px] overflow-y-auto" align="end">
                <div className="space-y-4">
                    <div>
                        <h3 className="font-semibold text-base mb-1">Refine Search</h3>
                        <p className="text-sm text-muted-foreground">Filter plugins by various criteria</p>
                    </div>

                    {/* Test WP Version */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-semibold">Tested WP Version</h4>
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox 
                                    id="latest-wp" 
                                    checked={latestWP}
                                    onCheckedChange={(checked) => setLatestWP(checked === true)}
                                />
                                <Label
                                    htmlFor="latest-wp"
                                    className="text-sm font-normal cursor-pointer"
                                >
                                    Latest WordPress versions
                                </Label>
                            </div>
                        </div>
                    </div>

                    {/* Last Updated */}
                    <div className="space-y-3">
                        <Label className="text-sm font-semibold">Last Updated</Label>
                        <Select value={lastUpdated} onValueChange={setLastUpdated}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select update timeframe" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1-month">Updated in the last month</SelectItem>
                                <SelectItem value="6-months">Updated in the last 6 months</SelectItem>
                                <SelectItem value="1-year">Updated in the last year</SelectItem>
                                <SelectItem value="not-recent">Not updated recently</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Popularity */}
                    <div className="space-y-3">
                        <Label className="text-sm font-semibold">Popularity</Label>
                        <Select value={popularity} onValueChange={setPopularity}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select popularity range" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1m-plus">+1M - Top Tier</SelectItem>
                                <SelectItem value="500k-plus">+500k - Trending</SelectItem>
                                <SelectItem value="100k-plus">+100k - Widely Used</SelectItem>
                                <SelectItem value="50k-plus">+50k - Well-Established</SelectItem>
                                <SelectItem value="10k-plus">+10k - Moderately Popular</SelectItem>
                                <SelectItem value="1k-plus">+1k - Growing Popularity</SelectItem>
                                <SelectItem value="0-plus">+0 - New or Niche Plugins</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Rating */}
                    <div className="space-y-3">
                        <Label className="text-sm font-semibold">Rating</Label>
                        <Select value={rating} onValueChange={setRating}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select rating range" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="5-stars">5 stars - Excellent</SelectItem>
                                <SelectItem value="4-stars">From 4 stars - Very Good</SelectItem>
                                <SelectItem value="3-stars">From 3 stars - Good</SelectItem>
                                <SelectItem value="2-stars">From 2 stars - Fair</SelectItem>
                                <SelectItem value="1-star">From 1 star - Low</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex gap-2 pt-4 border-t">
                        <Button onClick={handleApplyFilters} className="flex-1">Apply Filters</Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}