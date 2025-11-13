import Image from 'next/image'
import { decode } from "html-entities"
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const SinglePluginHeader = ({ pluginData }: { pluginData: WordPressPlugin }) => {
  return (
      <div className="px-[20px] md:px-[80px] pb-[clamp(0px,_5vw,_20px)]">
          <div className="max-w-[1160px] mx-auto space-y-4">
              {pluginData.banners.high && (
                  <Image src={pluginData.banners.high} alt={pluginData.name} width={1160} height={1160} />
              )}

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                      <Image src={pluginData.icons['1x'] || pluginData.icons.default || ''} alt={pluginData.name} width={96} height={96} />

                      <div className="space-y-2">
                          <h1 className="text-[24px] font-[400] leading-[1.2]">{decode(pluginData.name)}</h1>
                          <p className="text-[#656a71]">By <span className="text-[#3858e9] underline hover:no-underline" dangerouslySetInnerHTML={{ __html: pluginData.author }}></span></p>
                      </div>
                  </div>

                  <div className="flex items-center justify-end gap-4">
                      <Link href={pluginData.download_link} target="_blank" rel="noopener noreferrer">
                        <Button variant="wordpress">Download</Button>
                      </Link>

                      {pluginData.preview_link && (
                        <Link href={pluginData.preview_link} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline">Live Preview</Button>
                        </Link>
                      )}
                  </div>
              </div>
          </div>
      </div>
  )
}