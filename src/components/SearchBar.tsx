import { Dispatch, StateUpdater, useState } from "preact/hooks"

interface propsType {
    setKeywords: Dispatch<StateUpdater<string>>
}
export default function SearchBar({ setKeywords }: propsType) {
    const [value, setValue] = useState('')

    const handleChange = (e: any) => {
        setValue(e.target.value)
    }

    const handleSearch = () => {
        let filterdValue = value.trim().replace(/[,，\/]/, ' ')
        if (filterdValue.length > 0)
            setKeywords(filterdValue)
    }

    return (
        <div className={'sm:max-w-md my-4 mx-auto'}>
            <label className="inline-flex input input-bordered items-center gap-2 w-5/6 mr-1">
                <input type="text" className="grow" placeholder="请输入关键字" value={value} onChange={handleChange}
                    onKeyUp={e => {
                        if (e.key == 'Enter')
                            handleSearch()
                    }} />
            </label>
            <button className="btn btn-outline btn-info" onClick={handleSearch}>搜索</button>
        </div>
    )
}
