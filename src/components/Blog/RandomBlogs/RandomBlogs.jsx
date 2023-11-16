import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BlogCard from "../MyBlogs/BlogCard/BlogCard.jsx"
import Loader from '../../Loader/Loader.jsx'
import styles from "./RandomBlogs.module.css"

function RandomBlogs() {

    const [randomBlogs, setRandomBlogs] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    async function getRandomBlogs() {
        setIsLoading(true)
        const responce = await axios.get("https://blogiac-server.onrender.com/blog/random");
        setRandomBlogs(responce.data)
        setIsLoading(false)
    }

    useEffect(() => {
        getRandomBlogs()
    }, [])


    return (
        <div>
            <div className={styles['blog-list']} >
                {(
                    isLoading ? <div id={styles['loader']}><Loader /></div> :

                        (
                            randomBlogs.length ?
                                randomBlogs.map((ele, idx) => {
                                    return <BlogCard title={ele.title} content={ele.content} id={ele._id} key={ele._id} />
                                }) :
                                <h2>Hmm... Something is missing</h2>
                        )
                )}
            </div>
        </div>
    )
}

export default RandomBlogs