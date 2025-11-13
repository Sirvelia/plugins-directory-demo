'use client'

import { useState, useEffect } from 'react'
import { getPluginInsights } from '@/actions/suggerence'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Target, FileText, FolderOpen, Gauge, Sparkles, Tag, AlertCircle } from 'lucide-react'

import autop from 'autop'


export function SinglePluginTabsInsights({ pluginData }: { pluginData: WordPressPlugin }) {
    const [insights, setInsights] = useState<SuggerencePluginInsights | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchInsights = async () => {
            try {
                const data = await getPluginInsights(pluginData.slug)
                setInsights(data)
            } catch (error) {
                console.error('Failed to fetch insights:', error)
                setInsights(null)
            } finally {
                setLoading(false)
            }
        }

        fetchInsights()
    }, [pluginData.slug])

    if (loading) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-8 w-32" />
                <Card>
                    <CardContent>
                        <Skeleton className="h-6 w-full" />
                    </CardContent>
                </Card>
                <div className="space-y-3">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-20 w-full" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                        <CardContent>
                            <Skeleton className="h-16 w-full" />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent>
                            <Skeleton className="h-16 w-full" />
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }
    
    if (!insights) {
        return (
            <div className="">
                <h2 className="text-[24px] font-[600] leading-[1.2] mb-6">Insights</h2>
                <Card className="bg-[#f6f7f7]">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <AlertCircle className="w-5 h-5 text-[#656a71]" />
                            <p className="text-[#656a71] m-0">No insights available for this plugin.</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <>
            <div className="space-y-6">
                <h2 className="text-[24px] font-[600] leading-[1.2]">Insights</h2>
                
                {/* Main Purpose */}
                {insights.main_purpose && (
                    <Card>
                        <CardContent>
                            <p className="text-[#2c3338] m-0 text-xl italic">{insights.main_purpose}</p>
                        </CardContent>
                    </Card>
                )}

                {/* Summary */}
                {insights.summary && (
                    <div className="prose prose-neutral max-w-none">
                        <h3 className="text-[20px] font-[600] leading-[1.2] mb-3 flex items-center gap-2">
                            User Reviews Analysis
                        </h3>
                        <div className="text-[#2c3338]" dangerouslySetInnerHTML={{ __html: autop(insights.summary) }} />
                    </div>
                )}

                {/* Category and Complexity Level */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {insights.category && (
                        <Card>
                            <CardContent>
                                <div className="flex items-center gap-2 mb-2">
                                    <FolderOpen className="w-4 h-4 text-[#656a71]" />
                                    <h4 className="text-[14px] font-[600] text-[#656a71] uppercase">Category</h4>
                                </div>
                                <p className="text-[16px] font-[500] text-[#2c3338] m-0">{insights.category}</p>
                            </CardContent>
                        </Card>
                    )}
                    {insights.complexity_level && (
                        <Card>
                            <CardContent>
                                <div className="flex items-center gap-2 mb-2">
                                    <Gauge className="w-4 h-4 text-[#656a71]" />
                                    <h4 className="text-[14px] font-[600] text-[#656a71] uppercase">Complexity Level</h4>
                                </div>
                                <p className="capitalize text-[16px] font-[500] text-[#2c3338] m-0">{insights.complexity_level}</p>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Features */}
                {insights.features && insights.features.length > 0 && (
                    <div className="">
                        <h3 className="text-[20px] font-[600] leading-[1.2] mb-4 flex items-center gap-2">
                            Key Features
                        </h3>
                        <div className="grid grid-cols-1 gap-3">
                            {insights.features.map((feature, index) => (
                                <Card key={index} className="bg-white">
                                    <CardContent className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#2271b1] text-white flex items-center justify-center text-xs font-[600]">
                                            {index + 1}
                                        </div>
                                        <p className="text-[#2c3338] flex-1 m-0">{feature}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}

                {/* Tags */}
                {insights.tags && insights.tags.length > 0 && (
                    <div className="mt-8">
                        <h3 className="text-[20px] font-[600] leading-[1.2] mb-4 flex items-center gap-2">
                            Tags
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {insights.tags.map((tag, index) => (
                                <Badge key={index} variant="secondary" className="text-[13px] px-3 py-1">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}