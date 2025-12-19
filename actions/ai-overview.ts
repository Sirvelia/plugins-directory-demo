'use server'

import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { getResults } from './search';

export async function getAIOverview({ uuid }: { uuid: string }): Promise<string> {
    const results = await getResults(uuid);
    const query = results.search;
    const hyde = results.hyde || '';

    // Recommended: Use a fast model like gpt-4o-mini for low latency on UI overviews
    const model = openai('gpt-4.1');

    const response = await generateText({
        model,
        system: `You are PLoogins, a helpful WordPress expert assistant. 
        Your goal is to briefly explain the search strategy used to find plugins for the user.`,

        prompt: `The user searched for a specific functionality. We generated a detailed technical search criteria to find the best matches.
        
        Summarize what functionality we looked for in 2 sentences or less.
        
        <rules>
        1. Start directly with "We looked for..." or "Based on your request, we searched for..."
        2. Synthesize the "User Query" with the specific details found in the "Search Criteria".
        3. Do NOT mention "hypothetical descriptions", "AI", "embeddings", or "internal processes".
        4. Keep it under 60 words. Be concise and helpful.
        </rules>

        <user_query>
        ${query}
        </user_query>

        <search_criteria>
        ${hyde}
        </search_criteria>`,
    });

    return response.text;
}