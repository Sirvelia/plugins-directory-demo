import { getPluginData } from '@/actions/plugin-data'
import { SearchInput } from '@/components/SearchInput'
import { SinglePlugin } from '@/components/SinglePlugin'

export default async function SinglePluginPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params

    const pluginData = (await getPluginData([slug]))[0]

    return (
        <div className="pb-12">
            <div className="px-[20px] md:px-[80px] py-[clamp(0px,_5vw,_20px)]">
                <div className="max-w-[1160px] mx-auto flex justify-start">
                    <SearchInput />
                </div>
            </div>

            <SinglePlugin pluginData={pluginData} />
        </div>
    )
}