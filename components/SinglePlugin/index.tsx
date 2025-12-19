import { SinglePluginHeader } from './Header'
import { SinglePluginTabs } from './Tabs'

export const SinglePlugin = ({ pluginData }: { pluginData: WordPressPlugin }) => {
    
    return (
        <>
            <SinglePluginHeader pluginData={pluginData} />

            <div className="px-[20px] md:px-[80px] py-[clamp(0px,_5vw,_20px)]">
                <div className="max-w-full w-[1160px] mx-auto">
                    <SinglePluginTabs pluginData={pluginData} />
                </div>
            </div>
        </>
    )
};