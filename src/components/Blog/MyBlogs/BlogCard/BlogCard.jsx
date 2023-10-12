import React from 'react'
import { useNavigate } from 'react-router-dom';
import styles from "./BlogCard.module.css"


function Blog({ title = "", content = "", id = "" }) {

    const navigate = useNavigate()

    function openBlog(id) {
        navigate(`/user/myblogs/openblog/${id}`);
    }

    return (
        <div className={styles['blog-card']} id={id} onClick={(e) => openBlog(e.target.id)} >
            <h1 id={id} >{title}</h1>
            <p id={id}>{content}</p>
        </div>
    )
}

export default Blog