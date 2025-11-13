import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { SinglePluginTabsDescription } from './Description'
import { SinglePluginTabsSidebar } from './Sidebar'
import { SinglePluginTabsReviews } from './Reviews'
import { SinglePluginTabsInstallation } from './Installation'
import { SinglePluginTabsDevelopment } from './Development'
import { SinglePluginTabsInsights } from './Insights'
import { SinglePluginTabsRelated } from './Related'

export const SinglePluginTabs = ({ pluginData }: { pluginData: WordPressPlugin }) => {
    return (
        <Tabs defaultValue="ai_insights" className="w-full">
            <TabsList>
                <TabsTrigger value="ai_insights">AI Insights</TabsTrigger>
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="related">Related Plugins</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="installation">Installation</TabsTrigger>
                <TabsTrigger value="development">Development</TabsTrigger>
            </TabsList>

            <div className="grid grid-cols-12 gap-8">
                <TabsContent value="ai_insights" className="pt-12 col-span-12 lg:col-span-8">
                    <SinglePluginTabsInsights pluginData={pluginData} />
                </TabsContent>

                <TabsContent value="description" className="pt-12 col-span-12 lg:col-span-8">
                    <SinglePluginTabsDescription pluginData={pluginData} />
                </TabsContent>

                <TabsContent value="related" className="pt-12 col-span-12 lg:col-span-8">
                    <SinglePluginTabsRelated pluginData={pluginData} />
                </TabsContent>

                <TabsContent value="reviews" className="pt-12 col-span-12 lg:col-span-8">
                    <SinglePluginTabsReviews pluginData={pluginData} />
                </TabsContent>

                <TabsContent value="installation" className="pt-12 col-span-12 lg:col-span-8">
                    <SinglePluginTabsInstallation pluginData={pluginData} />
                </TabsContent>

                <TabsContent value="development" className="pt-12 col-span-12 lg:col-span-8">
                    <SinglePluginTabsDevelopment pluginData={pluginData} />
                </TabsContent>

                <SinglePluginTabsSidebar pluginData={pluginData} />
            </div>
        </Tabs>
    )
}