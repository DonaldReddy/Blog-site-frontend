import React from 'react'
import { useNavigate } from 'react-router-dom';
import styles from "./BlogCard.module.css"
import EditBlog from "../../EditBlog/EditBlog.jsx"


function BlogCard({ title = "", content = "", id = "" }) {

    const navigate = useNavigate()

    function openBlog(id) {
        navigate(`/user/myblogs/openblog/${id}`);
    }

    function editBlog() {
        navigate(`editblog/${id}`)
    }
    function deleteBlog() {
        navigate(`deleteblog/${id}`)
    }

    return (
        <>
            <div className={styles['blog-card']} id={id}  >
                <div id={styles['main']} onClick={(e) => openBlog(e.target.id)}>
                    <h1 id={id} >{title}</h1>
                    <p id={id}>{content.split(" ").slice(0, 30).join(" ") + "...."}</p>
                </div>
                <div id={styles['button']}>
                    <button id={styles['b1']} value={id} onClick={editBlog} >Edit</button>
                    <button id={styles['b2']} value={id} onClick={deleteBlog} >Delete</button>
                </div>
            </div>
        </>
    )
}

export default BlogCard