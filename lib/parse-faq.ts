import { FAQItem } from '@/components/FAQAccordion'

export function parseFAQHTML(html: string): FAQItem[] {
    const faqs: FAQItem[] = []
    
    // Handle malformed WordPress FAQ format: <dt>...</h4><p>...</p>
    // Split by <dt> tags
    const dtSections = html.split(/<dt[^>]*>/i)
    
    for (let i = 1; i < dtSections.length; i++) {
        const section = dtSections[i]
        
        // Find the question (everything before </h4> or </dt>)
        let questionEnd = section.indexOf('</h4>')
        if (questionEnd === -1) {
            questionEnd = section.indexOf('</dt>')
        }
        
        if (questionEnd === -1) continue
        
        const question = section.substring(0, questionEnd).replace(/<[^>]*>/g, '').trim()
        
        // Get the rest of the section after the question
        let remainder = section.substring(questionEnd).replace(/^<\/h[1-6]>/i, '').replace(/^<\/dt>/i, '').trim()
        
        // Find the next <dt> to know where this FAQ ends
        const nextDtIndex = remainder.indexOf('<dt')
        if (nextDtIndex !== -1) {
            remainder = remainder.substring(0, nextDtIndex)
        }
        
        // Extract the answer content (everything in <p> tags)
        let answer = remainder.trim()
        
        if (question && answer) {
            faqs.push({ question, answer })
        }
    }
    
    // If no results, try standard dt/dd pairs
    if (faqs.length === 0) {
        const dtRegex = /<dt[^>]*>([\s\S]*?)<\/dt>/g
        const ddRegex = /<dd[^>]*>([\s\S]*?)<\/dd>/g
        
        const dtMatches = Array.from(html.matchAll(dtRegex))
        const ddMatches = Array.from(html.matchAll(ddRegex))
        
        if (dtMatches.length > 0 && dtMatches.length === ddMatches.length) {
            dtMatches.forEach((dtMatch, index) => {
                const question = dtMatch[1].replace(/<[^>]*>/g, '').trim()
                const answer = ddMatches[index][1].trim()
                
                if (question && answer) {
                    faqs.push({ question, answer })
                }
            })
        }
    }
    
    // If still no results, try h3/h4 + following content format
    if (faqs.length === 0) {
        const sections = html.split(/<h[34][^>]*>/i)
        
        for (let i = 1; i < sections.length; i++) {
            const section = sections[i]
            const headingEnd = section.indexOf('</h')
            
            if (headingEnd !== -1) {
                const question = section.substring(0, headingEnd).replace(/<[^>]*>/g, '').trim()
                let answer = section.substring(headingEnd + 5).trim()
                
                // Get content until next heading
                const nextHeading = answer.search(/<h[234][^>]*>/i)
                if (nextHeading !== -1) {
                    answer = answer.substring(0, nextHeading).trim()
                }
                
                if (question && answer) {
                    faqs.push({ question, answer })
                }
            }
        }
    }
    
    return faqs
}

