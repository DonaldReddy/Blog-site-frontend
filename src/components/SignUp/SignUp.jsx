import React, { useState } from 'react'
import styles from "./SignUp.module.css"
import axios from "axios"

function SignUp() {

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
            const response = await axios.post("http://localhost:3000/signup", formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            })
        } catch (error) {
            console.error(error);
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    return (
        <div className={styles['main']}>

            <form id={styles['signup-form']} >

                <label htmlFor={styles['email']}>
                    Email -
                    <input type='email' id={styles['email']} name='email' onChange={handleChange} ></input>
                </label>

                <label htmlFor={styles['password']}>
                    Password -
                    <input type='password' id={styles['password']} name='password' onChange={handleChange} ></input>
                </label>

                <button id={styles['submit']} onClick={handleSubmit} >SignUp</button>

            </form>

        </div>
    )
}

export default SignUp