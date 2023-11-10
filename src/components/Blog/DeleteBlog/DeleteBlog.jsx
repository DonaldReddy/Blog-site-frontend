import React, { useContext } from 'react'
import { useNavigate } from "react-router-dom"
import UserContext from "../../../context/UserContext.js"

function DeleteBlog() {
    const { UserAuth } = useContext(UserContext)
    const navigate = useNavigate();

    if (!UserAuth)
        navigate("/signin")
    return (
        <div>DeleteBlog</div>
    )
}

export default DeleteBlog