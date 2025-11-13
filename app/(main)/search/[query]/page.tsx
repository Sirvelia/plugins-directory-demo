'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createSearchIntent } from '@/actions/search'
import Loading from '@/app/(main)/search/loading'

export default function SingleSearchPage({
    params,
}: {
    params: Promise<{ query: string }>
}) {
    const router = useRouter()
    const searchParams = useSearchParams()

    async function handleSearch() {

        const { query } = await params

        if (!query) {
            router.push('/')
            return
        }

        const decodedQuery = decodeURIComponent(query)

        // Get refine parameters from URL
        const latestWP = searchParams.get('latestWP')
        const lastUpdated = searchParams.get('lastUpdated')
        const popularity = searchParams.get('popularity')
        const rating = searchParams.get('rating')

        // Build search intent params
        const searchIntentParams: SearchIntentParams = {
            query: decodedQuery
        }

        // Map latestWP to min_tested_version
        if (latestWP === 'true') {
            searchIntentParams.min_tested_version = "latest major" // Latest WP version
        }

        // Map lastUpdated to min_last_updated
        if (lastUpdated) {
            const now = new Date()
            let minDate: string | null = null

            switch (lastUpdated) {
                case '1-month':
                    minDate = "1 month ago"
                    break
                case '6-months':
                    minDate = "6 months ago"
                    break
                case '1-year':
                    minDate = "1 year ago"
                    break
            }

            if (minDate) {
                searchIntentParams.min_last_updated = minDate
            }
        }

        // Map popularity to min_active_installs
        if (popularity) {
            const popularityMap: Record<string, number> = {
                '1m-plus': 1000000,
                '500k-plus': 500000,
                '100k-plus': 100000,
                '50k-plus': 50000,
                '10k-plus': 10000,
                '1k-plus': 1000,
                '0-plus': 0
            }
            searchIntentParams.min_active_installs = popularityMap[popularity]
        }

        // Map rating to min_rating
        if (rating) {
            const ratingMap: Record<string, number> = {
                '5-stars': 5,
                '4-stars': 4, 
                '3-stars': 3,
                '2-stars': 2, 
                '1-star': 1
            }
            searchIntentParams.min_rating = ratingMap[rating]
        }
        

        console.log(searchIntentParams)

        const result = await createSearchIntent(searchIntentParams)

        console.log(result)

        if (result?.search_intent_id) {
            // Preserve search params when redirecting
            const sort = searchParams.get('sort') || false
            console.log(sort)
            const queryString = sort ? new URLSearchParams({ sort: sort }).toString() : null
            const url = `/results/${result.search_intent_id}${queryString ? `?${queryString}` : ''}`
            router.push(url)
        } else {
            router.push('/')
        }
    }

    useEffect(() => {
        handleSearch()
    }, [])

    return <Loading />
}
