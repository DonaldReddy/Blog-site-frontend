import React, { useContext, useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from "axios"
import styles from "./AddBlog.module.css"
import UserContext from "../../../context/UserContext.js"

function AddBlog() {

    const { UserAuth, User } = useContext(UserContext)
    const [contentSize, setContentSize] = useState(800)
    const [titleSize, setTitleSize] = useState(100)
    const navigate = useNavigate();

    if (!UserAuth)
        navigate("/signin")

    const [blog, setBlog] = useState({
        title: "",
        content: ""
    });

    function handleTitleChange(e) {
        let title = e.target.value
        title = title.split(" ")
        const maxWords = 15
        if (title.length > maxWords) {
            alert("Title max words length exceded")
            e.target.value = title.slice(0, maxWords).join(" ");
            return
        }

        setTitleSize(Math.max(100, e.target.value.length * 3));

        title = title.slice(0, maxWords).join(" ");
        setBlog({ ...blog, ["title"]: title });
    }

    function handleContentChange(e) {
        const content = e.target.value
        setContentSize(Math.max(800, content.length * 0.8));
        setBlog({ ...blog, ["content"]: content });
    }

    async function handleAdd(e) {
        try {
            const data = { ...blog, email: User.data.email }
            console.log(data);
            await axios.post("http://localhost:5000/blog/addblog", data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            })
            alert("Succesfully posted new blog")
            navigate("/user/myblogs")
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className={styles['container']}>

            <textarea id={styles['title']} style={{ height: `${titleSize}px` }} placeholder='Title' autoFocus onInput={handleTitleChange} />

            <textarea id={styles['content']} style={{ height: `${contentSize}px` }} placeholder='Your Story....' onInput={handleContentChange} />

            <button id={styles['add']} onClick={handleAdd} disabled={blog.title && blog.content ? false : true}
            >Add Blog</button>

        </div>
    )
}

export default AddBlog