import { Dispatch, StateUpdater, useState } from "preact/hooks"
import searchIcon from '../assets/search.svg'
import { Link, useLocation } from "wouter";
import { useParams } from "wouter";

interface propsType {
    setKeywords: Dispatch<StateUpdater<string>>
}
export default function SearchBar({ setKeywords }: propsType) {
    const [_, setLocation] = useLocation();
    const { keyword } = useParams();
    const [value, setValue] = useState(keyword || '')
    const BASE_PATH = import.meta.env.VITE_BASE_PATH

    const handleChange = (e: any) => {
        const { value } = e.target
        setValue(value)
    }

    const handleSearch = () => {
        let filterdValue = value.trim().replace(/[,，\/]/, ' ')
        if (filterdValue.length > 0) {
            setKeywords(filterdValue)
            setLocation(`${BASE_PATH}/search/${value}`)
        }
    }

    return (
        <div className={'sm:w-1/2 my-4 mx-2 sm:mx-auto flex'}>
            <Link href={`${BASE_PATH || '/'}`} class="text-xl inline-flex items-center mr-1" onClick={() => setKeywords('')}>🏠</Link>
            <label className="inline-flex input input-bordered items-center gap-2 w-full mr-1">
                <img src={searchIcon} alt="search icon" />
                <input type="search" className="grow" placeholder="搜索法语，多个关键字空格隔开"
                    value={value} onChange={handleChange}
                    onKeyUp={e => {
                        if (e.key == 'Enter')
                            handleSearch()
                    }} />
            </label>
            <button className="btn btn-outline btn-info" onClick={handleSearch}>搜索</button>
        </div>
    )
}
