"use client"

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { decode } from 'html-entities'

export interface FAQItem {
    question: string
    answer: string
}

interface FAQAccordionProps {
    faqs: FAQItem[]
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
    if (faqs.length === 0) {
        return null
    }
    
    return (
        <div className="mt-8">
            <h3 className="text-[20px] font-[600] leading-[1.2] mb-4">FAQ</h3>
            <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger>{decode(faq.question)}</AccordionTrigger>
                        <AccordionContent>
                            <div 
                                className="prose prose-neutral prose-sm max-w-none"
                                dangerouslySetInnerHTML={{ __html: faq.answer }}
                            />
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}

