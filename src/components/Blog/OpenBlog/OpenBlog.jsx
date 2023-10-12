import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import axios from "axios"
import styles from "./OpenBlog.module.css"

function OpenBlog() {

    const { id } = useParams()
    const [email, setEmail] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    async function getBlog() {
        const response = await axios.get(`http://localhost:3000/blog/${id}`);
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
            <h1 id={styles['title']}>
                {title}
            </h1>
            <p id={styles['content']}>
                {content}
            </p>
            {email}
        </div>
    )
}

export default OpenBlog