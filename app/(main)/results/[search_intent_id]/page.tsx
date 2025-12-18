import { getResults } from '@/actions/search'
import { SearchActions } from '@/components/SearchActions'
import Results from '@/components/Results'
import { CompareFooter } from '@/components/CompareFooter'

export default async function SearchResultsPage({
    params,
}: {
    params: Promise<{ search_intent_id: string }>
}) {
    const { search_intent_id } = await params
    const results = await getResults(search_intent_id)

    return (
        <div className="pb-12">
            <SearchActions results={results} uuid={search_intent_id} />
            <div className="px-[20px] md:px-[80px] mt-[20px]">
                <div className="max-w-[1160px] mx-auto">
                    <h1 className="text-[18px] font-[600] leading-[1.2]">Search results for: "{results?.search}"</h1>
                </div>
            </div>
            <Results plugins={results?.results || []} />
            <CompareFooter />
        </div>
    )
}