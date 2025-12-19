import { SearchInput } from "../SearchInput";
import { Refine } from "./Refine";
import { Sort } from "./Sort";
import { Compare } from "./Compare";
import { AIOverview } from "./AIOverview";

export const SearchActions = ({ results, uuid }: { results?: SearchResults, uuid?: string }) => {
    return (
        <section className="px-[20px] md:px-[80px] py-6 space-y-6">
            <div className="max-w-[1160px] mx-auto flex flex-col justify-between md:items-center md:flex-row gap-[30px]">
                <div className="flex items-center gap-4">
                    <SearchInput results={results} />

                    {results?.results && results?.results.length > 0 && (
                        <span className="text-[14px] font-[400] text-[#656a71]">{results?.results.length} plugins</span>
                    )}
                </div>

                <div className="flex gap-2 md:justify-end">
                    <Refine results={results} />
                    <Compare />
                    <Sort />
                </div>
            </div>

            {(uuid && results?.hyde) && (
                <div className="max-w-[1160px] mx-auto">
                    <AIOverview uuid={uuid} />
                </div>
            )}
        </section>
    )
}