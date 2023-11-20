import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import UserContext from "../../../context/UserContext/UserContext.js"
import axios from 'axios'
import styles from "./DeleteBlog.module.css"
import Loader from '../../Loader/Loader.jsx'

function DeleteBlog() {
    const { UserAuth, User } = useContext(UserContext)
    const [isAuth, setIsAuth] = useState(true)
    const [isLoading, setIsLoading] = useState(true)

    const { id } = useParams();
    const navigate = useNavigate();

    if (!UserAuth)
        navigate("/signin")

    async function getBlog(id) {
        try {
            setIsLoading(true)
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
        finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        setIsLoading(false)
        getBlog(id);
    }, [])

    async function handleConfirm() {
        setIsLoading(true)
        const data = { id: id };
        const response = await axios.delete(`https://blogiac-server.onrender.com/blog/deleteblog/${id}`, data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
        setIsLoading(false)
        navigate("/user/myblogs")
    }

    function handleCancel() {
        navigate("/user/myblogs")
    }


    if (!isAuth)
        return <>Invalid Request</>

    return <div className={styles['container']}>
        {(isLoading ? <div id={styles['loader']}><Loader /></div> :
            <div id={styles['main']} >
                <h1>Do you want to delete the blog forever?</h1>
                <div id={styles['btns']}>
                    <button type='button' id={styles['confirm']} onClick={handleConfirm}>Confirm</button>
                    <button type='button' id={styles['cancel']} onClick={handleCancel} >Cancel</button>
                </div>
            </div>
        )}
    </div>
}

export default DeleteBlog