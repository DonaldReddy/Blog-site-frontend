import React, { useContext, useState } from 'react'
import axios from "axios"
import styles from "./AddBlog.module.css"
import UserContext from "../../../context/UserContext.js"

function AddBlog() {

    const { User } = useContext(UserContext);

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
        title = title.slice(0, maxWords).join(" ");
        setBlog({ ...blog, ["title"]: title });
    }

    function handleContentChange(e) {
        const content = e.target.value
        setBlog({ ...blog, ["content"]: content });
    }

    async function handleSubmit(e) {
        try {
            const data = { ...blog, email: User.data.email }
            console.log(data);
            await axios.post("http://localhost:5000/blog/addblog", data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            })
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className={styles['container']}>
            <input name="title" id={styles['title']} placeholder='Title' onInput={handleTitleChange} >

            </input>
            <textarea id={styles['content']} placeholder='Your Story....' onInput={handleContentChange} />
            <button onClick={handleSubmit} >Add Blog</button>
        </div>
    )
}

export default AddBlog