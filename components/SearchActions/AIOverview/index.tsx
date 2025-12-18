'use client'

import { getAIOverview } from "@/actions/ai-overview"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { InfoIcon, Sparkles } from "lucide-react"
import { useEffect, useState, useTransition } from "react"

export const AIOverview = ({ uuid }: { uuid: string }) => {

    const [aiOverview, setAIOverview] = useState<string>('');
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        if (!uuid) return;

        startTransition(async () => {
            const overview = await getAIOverview({ uuid });
            if (overview) {
                setAIOverview(overview);
            }
        })
    }, [uuid]);

    return (
        <Card>
            <CardContent>
                {isPending ? (
                    <>
                        <div className="h-[20px] w-full bg-neutral-200 rounded-md animate-pulse mb-2"></div>
                        <div className="h-[20px] w-full bg-neutral-200 rounded-md animate-pulse mb-2"></div>
                        <div className="h-[20px] w-1/2 bg-neutral-200 rounded-md animate-pulse"></div>
                    </>
                ) : (
                    <div className="space-y-2">
                        <div className="flex items-center gap-1 text-stone-800 font-medium">
                            <Sparkles className="w-4 h-4" />
                            <p className="text-[14px] ">Why did we choose these plugins?</p>
                        </div>

                        <p className="text-[14px] font-[400] text-neutral-800">{aiOverview}</p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}