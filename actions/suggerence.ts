import axios from 'axios'

const publicApi = 'https://api.suggerence.com/v1'

export async function getPluginInsights(slug: string): Promise<SuggerencePluginInsights> {
    const response = await axios.get(`${publicApi}/insights/${slug}`)
    return response.data
}