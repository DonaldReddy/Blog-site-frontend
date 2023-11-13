import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import styles from "./OpenBlog.module.css"

function OpenBlog() {

    const { id } = useParams()
    const [email, setEmail] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate()

    async function getBlog() {
        const response = await axios.get(`http://localhost:5000/blog/${id}`);
        if (!response.data.status)
            navigate("/user/myblogs")
        const { email, title, content } = response.data.blog[0];
        setEmail(email)
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
                Author - {email}
            </div>

        </div>
    )
}

export default OpenBlog