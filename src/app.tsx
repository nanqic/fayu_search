import './app.css'
import SearchBar from "./components/SearchBar";
import { useState } from "preact/hooks";
import SearchList from "./components/SearchList";

export function App() {
  const [keywords, setKeywords] = useState('')
  
  return (
    <>
      <div className="md:container md:mx-auto">
        <SearchBar setKeywords={setKeywords} />
        <SearchList keywords={keywords} />
      </div >
    </>
  )
}
