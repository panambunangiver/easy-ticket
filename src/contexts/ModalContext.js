import React from 'react'
//ModalContext is used to store data regarding the modal that will be shown, the data passed to it, and the callbacks attached to the modal
const ModalContext = React.createContext({})

export const ModalProvider = ModalContext.Provider
export default ModalContext
