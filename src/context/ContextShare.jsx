import React, { createContext, useState } from 'react'

export const addProjectResponseContext = createContext()
export const editProjectResponseContext = createContext()

function ContextShare({ children }) {
    // children is predifined props name used to share data beween compoents
    // create a state that need to be shared;
    const [addProjectResponse, setAddProjectResponse] = useState({})
    const [editProjectResponse, SetEditProjectResponse] = useState({})
    return (
        <>
            <addProjectResponseContext.Provider value={{ addProjectResponse, setAddProjectResponse }}>
                <editProjectResponseContext.Provider value={{ editProjectResponse, SetEditProjectResponse }}>
                    {children}
                </editProjectResponseContext.Provider>
            </addProjectResponseContext.Provider>
        </>
    )
}

export default ContextShare