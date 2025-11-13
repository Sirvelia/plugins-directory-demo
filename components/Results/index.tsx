'use client'

import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import { PluginGrid } from '@/components/PluginGrid'

// Parse WordPress date format: "2023-04-07 12:18pm GMT"
function parseWordPressDate(dateString: string): number {
    // Replace "am"/"pm" with space and extract time parts
    const dateMatch = dateString.match(/(\d{4}-\d{2}-\d{2})\s+(\d{1,2}):(\d{2})(am|pm)/i)
    
    if (!dateMatch) {
        return new Date(dateString).getTime()
    }
    
    const [, datePart, hours, minutes, ampm] = dateMatch
    let hour = parseInt(hours, 10)
    
    // Convert to 24-hour format
    if (ampm.toLowerCase() === 'pm' && hour !== 12) {
        hour += 12
    } else if (ampm.toLowerCase() === 'am' && hour === 12) {
        hour = 0
    }
    
    // Create ISO format date string
    const isoDate = `${datePart}T${hour.toString().padStart(2, '0')}:${minutes}:00Z`
    return new Date(isoDate).getTime()
}

export default function Results({ plugins }: { plugins: WordPressPlugin[] }) {
    const searchParams = useSearchParams()
    const sortParam = searchParams.get('sort') || 'none'

    const sortedPlugins = useMemo(() => {
        const pluginsCopy = [...plugins]

        switch (sortParam) {
            case 'recently-updated':
                return pluginsCopy.sort((a, b) => 
                    parseWordPressDate(b.last_updated) - parseWordPressDate(a.last_updated)
                )
            
            case 'older-updated':
                return pluginsCopy.sort((a, b) => 
                    parseWordPressDate(a.last_updated) - parseWordPressDate(b.last_updated)
                )
            
            case 'best-ratings':
                return pluginsCopy.sort((a, b) => b.rating - a.rating)
            
            case 'worst-ratings':
                return pluginsCopy.sort((a, b) => a.rating - b.rating)
            
            case 'most-active':
                return pluginsCopy.sort((a, b) => b.active_installs - a.active_installs)
            
            case 'least-active':
                return pluginsCopy.sort((a, b) => a.active_installs - b.active_installs)
            
            case 'newer-version':
                return pluginsCopy.sort((a, b) => {
                    // Compare tested versions (e.g., "6.7.1" vs "6.6.2")
                    const versionA = a.tested.split('.').map(Number)
                    const versionB = b.tested.split('.').map(Number)
                    
                    for (let i = 0; i < Math.max(versionA.length, versionB.length); i++) {
                        const numA = versionA[i] || 0
                        const numB = versionB[i] || 0
                        if (numB !== numA) return numB - numA
                    }
                    return 0
                })
            
            case 'older-version':
                return pluginsCopy.sort((a, b) => {
                    // Compare tested versions (e.g., "6.7.1" vs "6.6.2")
                    const versionA = a.tested.split('.').map(Number)
                    const versionB = b.tested.split('.').map(Number)
                    
                    for (let i = 0; i < Math.max(versionA.length, versionB.length); i++) {
                        const numA = versionA[i] || 0
                        const numB = versionB[i] || 0
                        if (numA !== numB) return numA - numB
                    }
                    return 0
                })
            
            default:
                return pluginsCopy
        }
    }, [plugins, sortParam])

    return <PluginGrid plugins={sortedPlugins} />
}

