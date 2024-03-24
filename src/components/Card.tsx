import { useState } from "preact/hooks";
import { SearchItem, Subtitle } from "../reuests";
import { useParams } from "wouter";
import Highlight from "./Highlight";

export default function Card({ title, subtitles, videoUrl }: SearchItem & { videoUrl: string }) {
    const subtitleList: Subtitle[] = JSON.parse(subtitles)
    const [load, setLoad] = useState(false)
    const { keyword } = useParams();


    return (
        <div className="card bg-base-100 shadow-xl mb-3">
            <div className="card-body gap-1 p-4">
                <h2 className="card-title text-lg">{title}</h2>
                {(load ? subtitleList : subtitleList.slice(0, 5)).map(sub => {
                    return <div>
                        <a className="link link-info text-xs mr-1 select-none" title={`第{sub.lineId}行`}
                            href={`${videoUrl}#t=${sub.startTime}`}
                            target='_blank'
                        >{sub.startTime.split('.')[0]}</a>
                        <Highlight search={keyword} text={sub.text} />
                    </div>
                })}
                {!load && subtitleList.length > 5 && <button className={'btn btn-sm'} onClick={() => setLoad(true)}>加载其余{subtitleList.length - 5}行</button>}
            </div>
        </div>
    )
}
