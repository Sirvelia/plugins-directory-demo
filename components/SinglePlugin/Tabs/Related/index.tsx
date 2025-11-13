'use client'

import { useState, useEffect } from 'react'
import { getRelatedPlugins } from '@/actions/related-plugins'
import { PluginCard } from '@/components/PluginCard'
import { Skeleton } from '@/components/ui/skeleton'

export const SinglePluginTabsRelated = ({ pluginData }: { pluginData: WordPressPlugin }) => {
    const [relatedPlugins, setRelatedPlugins] = useState<WordPressPlugin[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchRelatedPlugins = async () => {
            try {
                const plugins = await getRelatedPlugins(pluginData.slug)
                setRelatedPlugins(plugins.slice(0, 4))
            } catch (error) {
                console.error('Failed to fetch related plugins:', error)
                setRelatedPlugins([])
            } finally {
                setLoading(false)
            }
        }

        fetchRelatedPlugins()
    }, [pluginData.slug])

    return (
        <div className="space-y-6">
            <h2 className="text-[24px] font-[600] leading-[1.2]">Related Plugins</h2>

            {loading ? (
                <div className="grid grid-cols-1 gap-4">
                    {[...Array(4)].map((_, index) => (
                        <div key={index} className="border rounded-lg p-4 space-y-3">
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6" />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {relatedPlugins.map((plugin) => (
                        <PluginCard key={plugin.slug} plugin={plugin} />
                    ))}
                </div>
            )}
        </div>
    )
}