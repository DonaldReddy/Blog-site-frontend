import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from "axios"
import UserContext from '../../context/UserContext.js'
import styles from "./MyBlogs.module.css"
import Blog from "./Blog/Blog.jsx"


function Blogs() {

    const { User, isAuth } = useContext(UserContext);
    const [userBlogs, setUserBlogs] = useState({});
    const navigate = useNavigate()

    async function fetchBlogData() {

        try {
            const response = await axios.get(`http://localhost:3000/blogs/${User.data.email}`)
            if (!response.data.status)
                throw new Error(response.data.error);
            setUserBlogs(response.data.blogs)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchBlogData();
    }, [])

    return (
        <div className={styles['container']}>

            <button className={styles['add']} onClick={() => navigate("/user/addBlog")} >Add New Blog</button>

            <div className={styles['blog-list']} >
                <Blog title="test" />
                {JSON.stringify(User)}
                {JSON.stringify(userBlogs)}
            </div>

        </div>
    )
}

export default Blogs