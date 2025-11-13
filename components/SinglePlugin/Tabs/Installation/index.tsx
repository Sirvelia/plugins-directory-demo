export const SinglePluginTabsInstallation = ({ pluginData }: { pluginData: WordPressPlugin }) => {
    return (
        <div className="prose prose-neutral max-w-none">
            <h2 className="text-[24px] font-[600] leading-[1.2]">Installation</h2>
            <div className="prose prose-neutral max-w-none" dangerouslySetInnerHTML={{ __html: pluginData.sections?.installation || 'No installation instructions available.' }} />
        </div>
    )
}