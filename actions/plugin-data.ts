import axios from 'axios'

const publicApi = 'https://api.ploogins.com/v1/public'

export async function getPluginData(slugs: string[]): Promise<any> {
    const queryString = `slugs=${slugs.join(',')}`;
    const response = await axios.get(`${publicApi}/plugins?${queryString}`)
    return response.data
}