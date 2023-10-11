import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from "react-router-dom"
import UserContext from "../../context/UserContext.js"
import axios from "axios"
import styles from "./SignIn.module.css"

function SignIn() {

    const navigate = useNavigate()

    const { User, setUser, UserAuth, setUserAuth } = useContext(UserContext);

    useEffect(() => {
        if (UserAuth) {
            navigate("/");
        }
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
            const response = await axios.post("http://localhost:3000/signin", formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            })
            if (response.data.status) {
                const value = {
                    data: {
                        email: email
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
        <div className={styles['container']}>

            <form id={styles['signup-form']} >

                <label htmlFor={styles['email']}>
                    Email -
                    <input type='email' id={styles['email']} name='email' onChange={handleChange} ></input>
                </label>

                <label htmlFor={styles['password']}>
                    Password -
                    <input type='password' id={styles['password']} name='password' onChange={handleChange} ></input>
                </label>

                <button id={styles['submit']} onClick={handleSubmit} >SignIn</button>

            </form>

        </div>
    )
}

export default SignIn