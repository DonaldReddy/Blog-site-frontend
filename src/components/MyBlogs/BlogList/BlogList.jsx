import React from 'react'

function Blog({ title = "", content = "" }) {
    return (
        <div>{title}</div>
    )
}

export default Blog