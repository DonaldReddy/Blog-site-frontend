import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import UserContext from "../../../context/UserContext.js"
import axios from 'axios'
import styles from "./DeleteBlog.module.css"

function DeleteBlog() {
    const { UserAuth, User } = useContext(UserContext)
    const [isAuth, setIsAuth] = useState(false)
    const { id } = useParams();
    const navigate = useNavigate();

    if (!UserAuth)
        navigate("/signin")

    async function getBlog(id) {
        try {
            const response = await axios.get(`https://blogiac-server.onrender.com/blog/${id}`);
            if (response.data.blog[0].email === User.data.email) {
                setIsAuth(true);
            }
            else {
                setTimeout(() => {
                    navigate("/")
                }, 1000)
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getBlog(id);

    }, [])

    async function handleConfirm() {
        const data = { id: id };
        const response = await axios.delete(`https://blogiac-server.onrender.com/blog/deleteblog/${id}`, data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
        navigate("/user/myblogs")
    }

    function handleCancel() {
        navigate("/user/myblogs")
    }


    if (!isAuth)
        return <>Invalid Request</>

    return <div className={styles['container']}>
        <div id={styles['main']} >
            <h1>Do you want to delete the blog forever?</h1>
            <div id={styles['btns']}>
                <button type='button' id={styles['confirm']} onClick={handleConfirm}>Confirm</button>
                <button type='button' id={styles['cancel']} onClick={handleCancel} >Cancel</button>
            </div>
        </div>
    </div>
}

export default DeleteBlog