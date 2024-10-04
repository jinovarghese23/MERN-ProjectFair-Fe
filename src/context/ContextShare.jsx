import React, { createContext, useState } from 'react'

export const addProjectResponseContext = createContext();
export const editprojectResponseContext = createContext();

function ContextShare({ children }) {
    // children is predifined props name used to share data beween compoents
    // create a state that need to be shared;
    const [addProjectResponse, setAddProjectResponse] = useState({});
    const [editprojectResponse, setEditProjectResponse] = useState({});
    return (
        <>
            <addProjectResponseContext.Provider value={{ addProjectResponse, setAddProjectResponse }}>
                <editprojectResponseContext.Provider value={{ editprojectResponse, setEditProjectResponse }}>
                    {children}
                </editprojectResponseContext.Provider>

            </addProjectResponseContext.Provider>
        </>
    )
}

export default ContextShare