import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../../../context/UserContext/UserContext.js'
import { useNavigate } from "react-router-dom"
import BlogCard from "./BlogCard/BlogCard.jsx"
import Loader from '../../Loader/Loader.jsx'
import styles from "./MyBlogs.module.css"
import axios from "axios"
export default Blogs


function Blogs() {

    const { User, UserAuth } = useContext(UserContext);
    const [userBlogs, setUserBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    if (!UserAuth)
        navigate("/signin")

    async function fetchBlogData() {
        try {
            setIsLoading(true);
            const response = await axios.get(`https://blogiac-server.onrender.com/blog/blogs/${User.data.email}`)
            if (!response.data.status)
                throw new Error(response.data.error);
            setUserBlogs(response.data.blogs)
        } catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        fetchBlogData();
    }, [])

    return (
        <div className={styles['container']}>

            <button className={styles['add']} onClick={() => navigate("/user/myblogs/addblog")} >Add New Blog</button>

            <div className={styles['blog-list']} >
                {(
                    isLoading ? <div id={styles['loader']}><Loader /></div> :

                        (
                            userBlogs.length ?
                                userBlogs.map((ele, idx) => {
                                    return <BlogCard title={ele.title} content={ele.content} id={ele._id} key={ele._id} editable={true} />
                                }) :
                                <h2>No blogs found. Why not add a new one?</h2>
                        )
                )}
            </div>

        </div>
    )
}

