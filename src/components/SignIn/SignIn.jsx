import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from "react-router-dom"
import UserContext from "../../context/UserContext.js"
import axios from "axios"
import styles from "./SignIn.module.css"

function SignIn() {

    const navigate = useNavigate()

    const { User, setUser, UserAuth, setUserAuth } = useContext(UserContext);
    const [width, setWidth] = useState(window.innerWidth)

    function handleResize() {
        setWidth(window.innerWidth)
    }

    useEffect(() => {
        if (UserAuth) {
            navigate("/");
        }
        window.scrollTo(0, 0)
        window.addEventListener('resize', handleResize);
    }, [])

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    async function handleSubmit(e) {
        e.preventDefault();
        const { email, password } = formData;

        if (email === "" || !email.includes("@")) {
            alert("Invalid Email");
            return;
        }
        else if (password === "" || password.length < 5 || !password.match(/[@#$%^&*()\[\]|/?><.+_-]/g)) {
            alert("Invalid Password, should contain @ # $ % ^ & * ( ) \ [ ] | / ? > < . + _ -")
            return;
        }
        try {
            const response = await axios.post("https://blogiac-server.onrender.com/signin", formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            })
            if (response.data.status) {
                const value = {
                    data: {
                        email: email,
                        name: response.data.name
                    },
                    timeStamp: Date.now()
                };

                localStorage.setItem("user", JSON.stringify(value));

                setTimeout(() => {
                    setUser(value);
                    setUserAuth(true);
                    navigate("/")
                }, 3000);
            }
        } catch (error) {
            console.error(error);
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    return (
        <div className={styles['container']} >

            <form id={styles['signup-form']} style={width <= 500 ? { width: '380px' } : {}}>

                <label htmlFor={styles['email']}>
                    Email -
                    <input type='email' id={styles['email']} name='email' onChange={handleChange} ></input>
                </label>

                <label htmlFor={styles['password']}>
                    Password -
                    <input type='password' id={styles['password']} name='password' onChange={handleChange} ></input>
                </label>

                <button id={styles['submit']} onClick={handleSubmit} >Sign In</button>

            </form>

        </div>
    )
}

export default SignIn