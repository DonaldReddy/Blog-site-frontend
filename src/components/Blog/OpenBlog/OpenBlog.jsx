import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import styles from "./OpenBlog.module.css"

function OpenBlog() {

    const { id } = useParams()
    const [author, setAuthor] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate()

    async function getBlog() {
        const response = await axios.get(`https://blogiac-server.onrender.com/blog/${id}`);
        if (!response.data.status)
            navigate("/user/myblogs")
        console.log(response.data);
        const { author, title, content } = response.data.blog[0];
        setAuthor(author)
        setTitle(title)
        setContent(content)
    }

    useEffect(() => {
        getBlog()
    }, [])

    return (
        <div className={styles['container']}>

            <div className={styles['main']}>
                <h1 id={styles['title']}>
                    {title}
                </h1>

                <p id={styles['content']}>
                    {content}
                </p>
            </div>

            <div id={styles['author']}>
                Author - {author}
            </div>

        </div>
    )
}

export default OpenBlog