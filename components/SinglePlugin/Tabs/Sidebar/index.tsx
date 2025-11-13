import Link from "next/link"
import { formatRelativeTime, formatActiveInstallations } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"


export const SinglePluginTabsSidebar = ({ pluginData }: { pluginData: WordPressPlugin }) => {

    const businessModel = pluginData.business_model || 'community'

    const rating = pluginData.rating / 20
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    const lastUpdateRelative = formatRelativeTime(pluginData.last_updated)
    const activeInstallations = formatActiveInstallations(pluginData.active_installs)

    return (
        <div className="pt-12 col-span-12 lg:col-span-4 space-y-6">

            {businessModel === 'community' && pluginData.repository_url && (
                <div>
                    <h2 className="text-[20px] font-[600] leading-[1.2] mb-2"><span className="capitalize">{businessModel}</span> plugin</h2>
                    <p className="text-[14px] font-[400] text-[#656a71]">This plugin is developed and supported by a community. <Link className="text-[#3858e9] underline hover:no-underline" href={pluginData.repository_url} target="_blank" rel="noopener noreferrer">Contribute to this plugin</Link></p>
                </div>
            )}

            {businessModel === 'commercial' && pluginData.commercial_support_url && (
                <div>
                    <h2 className="text-[20px] font-[600] leading-[1.2] mb-2"><span className="capitalize">{businessModel}</span> plugin</h2>
                    <p className="text-[14px] font-[400] text-[#656a71]">This plugin is free but offers additional paid commercial upgrades or support. <Link className="text-[#3858e9] underline hover:no-underline" href={pluginData.commercial_support_url} target="_blank" rel="noopener noreferrer">View support</Link></p>
                </div>
            )}


            <div className="divide-y divide-[#dcdcde] text-sm">

                <div className="flex justify-between items-center gap-4 py-2">
                    <p>Version</p>
                    <p>{pluginData.version}</p>
                </div>

                <div className="flex justify-between items-center gap-4 py-2">
                    <p>Last updated</p>
                    <p>{lastUpdateRelative}</p>
                </div>

                <div className="flex justify-between items-center gap-4 py-2">
                    <p>Active installations</p>
                    <p>{activeInstallations}</p>
                </div>

                <div className="flex justify-between items-center gap-4 py-2">
                    <p>WordPress version</p>
                    <p>{pluginData.requires} or higher</p>
                </div>

                <div className="flex justify-between items-center gap-4 py-2">
                    <p>Tested up to</p>
                    <p>{pluginData.tested}</p>
                </div>

                <div className="flex justify-between items-center gap-4 py-2">
                    <p>PHP version</p>
                    <p>{pluginData.requires_php} or higher</p>
                </div>

                <div className="flex justify-between items-center gap-4 py-2">
                    <p>Languages</p>
                    <p>{pluginData.language_packs.length} language packs</p>
                </div>

                <div className="flex justify-between items-center gap-8 py-2">
                    <p>Tags</p>
                    <div className="flex justify-end items-center gap-2 flex-wrap">
                        {Object.entries(pluginData.tags).map(([tag, label]) => (
                            <Badge key={tag} variant="secondary">{label}</Badge>
                        ))}
                    </div>
                </div>

                <div className="flex justify-between items-center gap-4 py-2">
                    <Link className="text-[#3858e9] underline hover:no-underline" href={`https://wordpress.org/plugins/${pluginData.slug}/advanced/`} target="_blank" rel="noopener noreferrer">
                        Advanced View
                    </Link>
                </div>

            </div>

            <div className="space-y-4">
                <h2 className="text-[20px] font-[600] leading-[1.2]">Ratings</h2>

                <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => {
                        const isFilled = i < fullStars || (i === fullStars && hasHalfStar)
                        return (
                            <Star
                                key={i}
                                className={`w-6 h-6 ${isFilled ? 'fill-[#e26f56] text-[#e26f56]' : 'text-[#d9d9d9] stroke-[#e26f56]'} `}
                            />
                        )
                    })}
                    <span className="text-[14px] font-[400] text-[#656a71]">{rating.toFixed(1)} out of 5 stars.</span>
                </div>

                <div className="space-y-2">
                    {Object.entries(pluginData.ratings).reverse().map(([rating, count]) => (
                        <Link key={rating} href={`https://wordpress.org/support/plugin/${pluginData.slug}/reviews/?filter=${rating}`} target="_blank" rel="noopener noreferrer" className="group block w-full flex items-center gap-4 justify-between">
                            <p className="flex-[0_1_40px] text-[14px] font-[400] text-[#3858e9] group-hover:underline">{rating} star</p>

                            <span className="flex-1 bg-neutral-200 h-[30px] relative overflow-hidden">
                                <span className="absolute h-full top-0 left-0 bg-[#e26f56]" style={{ width: `${count / pluginData.num_ratings * 100}%` }}></span>
                            </span>

                            <span className="flex-[0_1_50px] text-right text-[14px] font-[400] text-[#3858e9] group-hover:underline">{count}</span>

                        </Link>
                    ))}

                    <div className="flex items-center justify-between gap-4">
                        <Link href={`https://wordpress.org/support/plugin/${pluginData.slug}/reviews/#new-post`} target="_blank" rel="noopener noreferrer" className="text-[14px] font-[400] text-[#3858e9] underline">Add my review</Link>

                        <Link href={`https://wordpress.org/support/plugin/${pluginData.slug}/reviews/`} target="_blank" rel="noopener noreferrer" className="text-[14px] font-[400] text-[#3858e9] underline">See all</Link>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-[20px] font-[600] leading-[1.2]">Support</h2>

                <div>
                    <p>Issues resolved in last two months:</p>
                </div>

                <div className="bg-neutral-200 h-[40px] relative overflow-hidden flex item-center px-2">
                    <span className="absolute h-full top-0 left-0 bg-[#c7ffdb]" style={{ width: `${pluginData.support_threads_resolved / pluginData.support_threads * 100}%` }}></span>
                    <span className="absolute text-[14px] font-[400] text-[#656a71] leading-[40px]">{pluginData.support_threads_resolved} out of {pluginData.support_threads}</span>
                </div>

                <div>
                    <Link href={`https://wordpress.org/support/plugin/${pluginData.slug}/`} target="_blank" rel="noopener noreferrer" className="text-[14px] font-[400] text-[#3858e9] underline">View support forum</Link>
                </div>
            </div>

        </div>
    )
}