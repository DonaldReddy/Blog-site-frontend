import React, { useState } from 'react'
import UserContext from "./UserContext.js"

function UserContextProvider({ children }) {

    const [User, setUser] = useState(JSON.parse(localStorage.getItem("user")) || {})
    const [UserAuth, setUserAuth] = useState(localStorage.getItem("user") ? true : false)

    return (
        <UserContext.Provider value={{ User, setUser, UserAuth, setUserAuth }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider