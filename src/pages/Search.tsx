import SearchBar from "../components/SearchBar";
import { useState } from "preact/hooks";
import SearchList from "../components/SearchList";
import { useParams } from "wouter";

export function Search() {
    const { keyword } = useParams();

    const [keywords, setKeywords] = useState(keyword || '')

    return (
        <>
            <SearchBar setKeywords={setKeywords} />
            <SearchList keywords={keywords} />
        </>
    )
}