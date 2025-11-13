import axios from 'axios'

const publicApi = 'https://api.ploogins.com/v1/public'

export async function getRelatedPlugins(slug: string): Promise<WordPressPlugin[]> {
    const response = await axios.post(`${publicApi}/related`, { plugin_slug: slug })
    return response.data
}