import React, { useContext } from 'react'
import UserContext from "../../context/UserContext.js"
import { json } from 'react-router-dom';


function Dashboard() {

    const { UserAuth, User } = useContext(UserContext)

    return (
        <div>Dashboard</div>
    )
}

export default Dashboard