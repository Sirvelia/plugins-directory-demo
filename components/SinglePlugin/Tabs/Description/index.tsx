import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel'
import Image from 'next/image'
import Link from 'next/link'
import { FAQAccordion } from '@/components/FAQAccordion'
import { parseFAQHTML } from '@/lib/parse-faq'

export const SinglePluginTabsDescription = ({ pluginData }: { pluginData: WordPressPlugin }) => {
    return (
        <>
            <div className="prose prose-neutral max-w-none">
                <h2 className="text-[24px] font-[600] leading-[1.2]">Description</h2>
                <div dangerouslySetInnerHTML={{ __html: pluginData.sections?.description || 'No description available.' }} />
            </div>

            {pluginData.screenshots && Object.keys(pluginData.screenshots).length > 0 && (
                <div className="mt-8">
                    <h3 className="text-[20px] font-[600] leading-[1.2] mb-4">Screenshots</h3>
                    <Carousel className="w-full">
                        <CarouselContent>
                            {Object.entries(pluginData.screenshots).map(([key, screenshot]: [string, any]) => (
                                <CarouselItem key={key}>
                                    <div className="space-y-2">
                                        <Image
                                            src={screenshot.src}
                                            alt={screenshot.caption || `Screenshot ${key}`}
                                            width={1200}
                                            height={800}
                                            className="w-full h-[400px] object-contain"
                                        />
                                        {screenshot.caption && (
                                            <p className="text-sm text-[#656a71] text-center" dangerouslySetInnerHTML={{ __html: screenshot.caption }}></p>
                                        )}
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            )}

            {pluginData.blocks && Object.keys(pluginData.blocks).length > 0 && (
                <div className="mt-8">
                    <h3 className="text-[20px] font-[600] leading-[1.2] mb-4">Blocks</h3>
                    <div className="space-y-4">
                        {Object.entries(pluginData.blocks).map(([blockName, block]: [string, any]) => (
                            <div key={blockName} className="border border-[#dcdcde] rounded-lg p-4">
                                <div className="flex items-start gap-4">
                                    <div className="flex-1">
                                        <h4 className="text-[16px] font-[600] mb-1">{block.title}</h4>
                                        {block.description && (
                                            <p className="text-sm text-[#656a71]">{block.description}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {pluginData.sections?.faq && (
                <FAQAccordion faqs={parseFAQHTML(pluginData.sections.faq)} />
            )}

            {pluginData.contributors && Object.keys(pluginData.contributors).length > 0 && (
                <div className="mt-8">
                    <h3 className="text-[20px] font-[600] leading-[1.2] mb-4">Contributors & Developers</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {Object.entries(pluginData.contributors).map(([contributorId, contributor]: [string, any]) => (
                            <Link
                                key={contributorId}
                                href={contributor.profile}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-4"
                            >
                                <Image
                                    src={contributor.avatar}
                                    alt={contributor.display_name}
                                    width={40}
                                    height={40}
                                    className="rounded-full"
                                />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-[500] text-[#2c3338] truncate underline group-hover:no-underline">
                                        {contributor.display_name}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}