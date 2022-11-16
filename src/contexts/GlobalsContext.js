import React from 'react'
//GlobalContext is used to store data that will be accessed by various components in the project
const GlobalsContext = React.createContext({})

export const GlobalsProvider = GlobalsContext.Provider
export default GlobalsContext
