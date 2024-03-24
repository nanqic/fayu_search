import { useEffect, useState } from "preact/hooks"
import { Result, SearchItem, searchRequst } from "../reuests"
import Card from "./Card"
import Pagination from "./Pagination";
import { Fragment } from "preact/jsx-runtime";

interface propsType {
    keywords: string | undefined
}
export default function SearchList({ keywords }: propsType) {
    const [result, setResult] = useState<Result | undefined>()
    let baseUrl = import.meta.env.VITE_VIDEO_URL
    const fetchData = async (page = 1) => {
        if (keywords) {
            const res = await searchRequst(keywords, page)
            res.total > 0 && setResult(res)
        }
    }
    useEffect(() => {
        fetchData()
    }, [keywords])

    return (
        <div>
            {result ? result?.data.map((item: SearchItem, index) => {
                return <Fragment key={index} >
                    <Card {...item} videoUrl={`${baseUrl}#${item.series}/${item.title}.mp4`} />

                </Fragment>
            }) : keywords&&<p className={'text-center'}>没有符合搜索条件的结果</p>
            }
            {result && result?.total > result.pageSize &&
                <Pagination {...result} fetchData={fetchData} />
            }

        </div>
    )
}
