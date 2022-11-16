import React from 'react'
//LoadingContext is used to store state regarding the loading overlay
const LoadingContext = React.createContext({})

export const LoadingProvider = LoadingContext.Provider
export default LoadingContext
