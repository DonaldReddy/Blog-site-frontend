import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from "react-router-dom"
import UserContext from "../../context/UserContext.js"
import Loader from "../Loader/Loader.jsx"
import axios from "axios"
import styles from "./SignUp.module.css"

function SignUp() {

    const navigate = useNavigate()

    const { User, setUser, UserAuth, setUserAuth } = useContext(UserContext);
    const [width, setWidth] = useState(window.innerWidth)
    const [isLoading, setIsLoading] = useState(false)

    function handleResize() {
        setWidth(window.innerWidth)
    }

    useEffect(() => {
        setIsLoading(false)
        if (UserAuth) {
            navigate("/");
        }
        window.scrollTo(0, 0)
        window.addEventListener('resize', handleResize);
    }, [])

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true)
        const { name, email, password } = formData;

        if (name === "") {
            alert("Invalid Name")
            return
        }
        else if (email === "" || !email.includes("@")) {
            alert("Invalid Email");
            return;
        }
        else if (password === "" || password.length < 5 || !password.match(/[@#$%^&*()\[\]|/?><.+_-]/g)) {
            alert("Invalid Password, should contain @ # $ % ^ & * ( ) \ [ ] | / ? > < . + _ -")
            return;
        }
        try {
            const response = await axios.post("https://blogiac-server.onrender.com/signup", formData, {
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

                alert("Successfully created account, please login!!")
                navigate("/")
            }
            else {
                if (response.data.error.code == 11000)
                    alert("Email already in use")
            }
        } catch (error) {
            console.error(error);
        }
        finally {
            setIsLoading(false)
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        console.log(formData);
    }

    return (
        <div className={styles['container']}>

            {(isLoading ? <Loader />
                :
                <form id={styles['signup-form']} style={width <= 500 ? { width: '380px' } : {}}>

                    <label htmlFor={styles['name']}>
                        Name -
                        <input type='text' id={styles['name']} name='name' onChange={handleChange} ></input>
                    </label>

                    <label htmlFor={styles['email']}>
                        Email -
                        <input type='email' id={styles['email']} name='email' onChange={handleChange} ></input>
                    </label>

                    <label htmlFor={styles['password']}>
                        Password -
                        <input type='password' id={styles['password']} name='password' onChange={handleChange} ></input>
                    </label>

                    <button id={styles['submit']} onClick={handleSubmit} >Sign Up</button>

                </form>
            )}
        </div>
    )
}

export default SignUp