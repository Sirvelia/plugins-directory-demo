import { EB_Garamond } from "next/font/google";

import { PluginGrid } from "@/components/PluginGrid";
import { getPluginData } from "@/actions/plugin-data";
import { SearchInput } from "@/components/SearchInput";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonGrid } from "@/components/SkeletonGrid";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
});

const featuredPluginsSlugs = [
  'akismet',
  'jetpack',
  'health-check',
  'gutenberg',
  'performance-lab',
  'bbpress'
]

const betaPluginsSlugs = [
  'gutenberg',
  'preferred-languages',
  'two-factor',
  'performance-lab',
  'performant-translations',
  'wp-jquery-update-test'
]

const popularPluginsSlugs = [
  'elementor',
  'wordpress-seo',
  'contact-form-7',
  'classic-editor',
  'woocommerce',
  'litespeed-cache',
]

const blockEnabledPluginsSlugs = [
  'qubely',
  'template-events-calendar',
  'ultimate-post',
  'meow-gallery',
  'pretty-link',
  'recipe-card-blocks-by-wpzoom'
]

async function FeaturedPlugins() {
  const featuredPlugins = await getPluginData(featuredPluginsSlugs)
  return (
      <PluginGrid plugins={featuredPlugins} />
  )
}

async function BetaPlugins() {
  const betaPlugins = await getPluginData(betaPluginsSlugs)
    return (
      <PluginGrid plugins={betaPlugins} />
  )
}

async function PopularPlugins() {
  const popularPlugins = await getPluginData(popularPluginsSlugs)
  return (
      <PluginGrid plugins={popularPlugins} />
  )
}

async function BlockEnabledPlugins() {
  const blockEnabledPlugins = await getPluginData(blockEnabledPluginsSlugs)
  return (
      <PluginGrid plugins={blockEnabledPlugins} />
  )
}

export default function Home() {
  return (
    <div className="pb-12">
      <section className="bg-[#23282d] text-white px-[20px] md:px-[80px] pb-[clamp(30px,_5vw,_50px)]">
        <div className="max-w-[1160px] mx-auto pt-[clamp(30px,_5vw,_50px)] flex flex-col md:flex-row gap-[30px] md:items-end mb-4">
          <h1 className={`${ebGaramond.className} text-[50px] font-normal text-white leading-[60px]`}>Plugins</h1>
          <p className="leading-[2.3]">Extend your WordPress experience! Browse over 60,000 free plugins.</p>
        </div>
        <span>EXPERIMENTAL</span>
      </section>

      <section className="px-[20px] md:px-[80px] py-6">
        <div className="max-w-[1160px] mx-auto flex flex-col justify-between md:items-center md:flex-row gap-[30px]">
          <SearchInput />
        </div>
      </section>

      <div className="space-y-12">
        <div>
          <div className="px-[20px] md:px-[80px] mt-[20px]">
            <div className="max-w-[1160px] mx-auto">
              <h2 className="text-[20px] font-[600] leading-[1.2] mb-5">Featured Plugins</h2>
            </div>
          </div>

          <Suspense fallback={<SkeletonGrid />}>
            <FeaturedPlugins />
          </Suspense>
        </div>

        <div>
          <div className="px-[20px] md:px-[80px] mt-[20px]">
            <div className="max-w-[1160px] mx-auto">
              <h2 className="text-[20px] font-[600] leading-[1.2] mb-5">Beta Plugins</h2>
            </div>
          </div>

          <Suspense fallback={<SkeletonGrid />}>
            <BetaPlugins />
          </Suspense>
        </div>

        <div>
          <div className="px-[20px] md:px-[80px] mt-[20px]">
            <div className="max-w-[1160px] mx-auto">
              <h2 className="text-[20px] font-[600] leading-[1.2] mb-5">Popular Plugins</h2>
            </div>
          </div>

          <Suspense fallback={<SkeletonGrid />}>
            <PopularPlugins />
          </Suspense>
        </div>

        <div>
          <div className="px-[20px] md:px-[80px] mt-[20px]">
            <div className="max-w-[1160px] mx-auto">
              <h2 className="text-[20px] font-[600] leading-[1.2] mb-5">Block-Enabled plugins Plugins</h2>
            </div>
          </div>

          <Suspense fallback={<SkeletonGrid />}>
            <BlockEnabledPlugins />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
