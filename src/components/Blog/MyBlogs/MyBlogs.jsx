import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../../../context/UserContext.js'
import { useNavigate } from "react-router-dom"
import BlogList from "./BlogCard/BlogCard.jsx"
import styles from "./MyBlogs.module.css"
import axios from "axios"
export default Blogs


function Blogs() {

    const { User, isAuth } = useContext(UserContext);
    const [userBlogs, setUserBlogs] = useState([]);
    const navigate = useNavigate()

    async function fetchBlogData() {

        try {
            const response = await axios.get(`http://localhost:3000/blog/blogs/${User.data.email}`)
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

            <button className={styles['add']} onClick={() => navigate("/user/addblog")} >Add New Blog</button>

            <div className={styles['blog-list']} >
                {userBlogs.map((ele, idx) => {
                    return <BlogList title={ele.title} content={ele.content} id={ele._id} key={ele._id} />
                })}
            </div>

        </div>
    )
}
