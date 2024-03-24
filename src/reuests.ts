const API_URL = import.meta.env.VITE_API_URL

export interface Subtitle {
    lineId: number
    startTime: string
    text: string
}

export interface SearchItem {
    count: number
    subtitles: string
    title: string
    series: string
}

export interface Result extends Pagi {
    data: SearchItem[]
}

export interface Pagi {
    total: number
    pageSize: number
    page: number
}

export async function searchRequst(keywords: string, page = 1): Promise<Result> {
    const res = await fetch(`${API_URL}/search/${keywords}/${page}`)
    return await res.json()
}