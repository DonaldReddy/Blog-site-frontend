import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from "react-router-dom"
import styles from "./EditBlog.module.css"
import axios from "axios"
import UserContext from "../../../context/UserContext.js"


function EditBlog() {

  const { UserAuth } = useContext(UserContext)
  const [contentSize, setContentSize] = useState(800)
  const [titleSize, setTitleSize] = useState(80)
  const navigate = useNavigate();

  if (!UserAuth)
    navigate("/signin")

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
      setContentSize(Math.max(800, content.length * 0.8));
      setTitleSize(Math.max(80, title.length * 0.8));
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getBlog(id);
  }, [])

  function handleTitleChange(e) {
    let title = e.target.value
    title = title.split(" ")
    const maxWords = 15
    if (title.length > maxWords) {
      alert("Title max words length exceded")
      e.target.value = title.slice(0, maxWords).join(" ");
      return
    }
    setTitleSize(Math.max(80, title.length / 2 * 30));
    title = title.slice(0, maxWords).join(" ");
    setBlog({ ...blog, ["title"]: title });
  }

  function handleContentChange(e) {
    const content = e.target.value
    setContentSize(content.length * 0.8);
    console.log(contentSize);
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

      <textarea id={styles['title']} style={{ height: `${titleSize}px` }} value={blog.title} onInput={handleTitleChange} />

      <textarea id={styles['content']} style={{ height: `${contentSize}px` }} value={blog.content} onInput={handleContentChange} />

      <button id={styles['save']} onClick={handleSave} >Save Blog</button>

    </div>
  )
}

export default EditBlog