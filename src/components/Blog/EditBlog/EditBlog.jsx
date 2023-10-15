import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import styles from "./EditBlog.module.css"
import axios from "axios"


function EditBlog() {
  const { id } = useParams();

  const [blog, setBlog] = useState({
    title: "",
    content: ""
  });

  async function getBlog(id) {
    try {
      const response = await axios.get(`http://localhost:5000/blog/${id}`);
      const { title, content } = response.data.blog[0]
      setBlog({ title: title, content: content })
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getBlog(id)
  }, [])

  function handleTitleChange(e) {

  }

  function handleContentChange(e) {
    const content = e.target.value
    setBlog({ ...blog, ["content"]: content });
  }

  async function handleSave(e) {
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
      <input name="title" id={styles['title']} value={blog.title} onInput={handleTitleChange} >

      </input>
      <textarea id={styles['content']} value={blog.content} placeholder='Your Story....' onInput={handleContentChange} />
      <button onClick={handleSave} >Save Blog</button>
    </div>
  )
}

export default EditBlog