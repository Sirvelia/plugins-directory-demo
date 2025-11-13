export const SinglePluginTabsDevelopment = ({ pluginData }: { pluginData: WordPressPlugin }) => {
    return (
        <div className="prose prose-neutral max-w-none">
            <h2 className="text-[24px] font-[600] leading-[1.2]">Changelog</h2>
            <div className="prose prose-neutral max-w-none" dangerouslySetInnerHTML={{ __html: pluginData.sections?.changelog || 'No development instructions available.' }} />
        </div>
    )
}