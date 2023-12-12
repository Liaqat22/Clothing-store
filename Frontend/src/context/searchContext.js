import React, { createContext, useContext, useState } from 'react'

const Search = createContext()

function SearchProvider({children}) {
const [values , setValues] = useState({
    keyword : "",
    result : []
})
 
  return (
    <div>
      <Search.Provider value={[values , setValues]}>{children}</Search.Provider>
    </div>
  )
}
 const useSearch =()=> useContext(Search)
export { SearchProvider ,Search , useSearch }
