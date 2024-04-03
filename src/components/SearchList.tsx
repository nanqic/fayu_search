import { useEffect, useState } from "preact/hooks"
import { Result, SearchItem, searchRequst } from "../reuests"
import Card from "./Card"
import Pagination from "./Pagination";
import { Fragment } from "preact/jsx-runtime";
import Skeleton from "./Skeleton";

interface propsType {
    keywords: string | undefined
}
export default function SearchList({ keywords }: propsType) {
    const [result, setResult] = useState<Result | undefined>()
    const [wait, setWait] = useState(false)
    const fetchData = async (page = 1) => {
        keywords = keywords?.replace(/[,，]/g, ' ').trim()
        if (keywords) {
            setWait(true)
            const res = await searchRequst(keywords, page)
            res.total > 0 ? setResult(res) :
                setResult(undefined)

            setWait(false)
        } else {
            setResult(undefined)
        }
    }
    useEffect(() => {
        fetchData()
    }, [keywords])

    return (
        <div className={'body-min-height mb-4'}>
            {wait && <Skeleton />}
            {result?.total &&
                <p className={`text-xl px-3`}>搜索到{result.total}个视频</p>
            }
            {!wait && result ? result?.data.map((item: SearchItem, index) => {
                return <Fragment key={index} ><Card {...item} /></Fragment>
            }) : keywords && !wait && <p className={'text-center'}>没有符合搜索条件的结果</p>
            }
            {result && result?.total > result.pageSize &&
                <Pagination {...result} fetchData={fetchData} />
            }
        </div>
    )
}
