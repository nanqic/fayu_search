import { useState } from "preact/hooks";
import { SearchItem, Subtitle } from "../reuests";
import { useParams } from "wouter";
import Highlight from "./Highlight";

export default function Card({ title, subtitles, videoUrl }: SearchItem & { videoUrl: string }) {
    const subtitleList: Subtitle[] = JSON.parse(subtitles)
    const [load, setLoad] = useState(false)
    const { keyword } = useParams();

    return (
        <div className="card bg-base-100 shadow-xl m-2 px-3 pb-1">
            <a href={`${videoUrl}`} className="card-title text-lg hover:text-blue-400">{title}</a >
            <div className="card-body gap-1 p-1 hover:bg-gray-100">
                {(load ? subtitleList : subtitleList.slice(0, 5)).map(sub => {
                    return <div>
                        <a className="link text-blue-400 text-xs mr-1 select-none no-underline hover:border-b-2 border-blue-400" title={`第${sub.lineId}行`}
                            href={`${videoUrl}#t=${(sub.startTime.slice(0, -4))}`}
                            target='_blank'
                        >[{sub.startTime.replace(new RegExp("^0(0:)?"), '').split('.')[0]}]
                            <Highlight search={keyword} text={sub.text} />
                        </a>
                    </div>
                })}
                {!load && subtitleList.length > 5 && <button className={'btn btn-sm'} onClick={() => setLoad(true)}>加载其余{subtitleList.length - 5}行</button>}
            </div>
        </div>
    )
}
