import React, { useRef } from 'react'
import style from "./register.module.scss"
import Link from 'next/link'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

const RegisterPage = () => {
    const name = useRef<HTMLInputElement>(null)
    const email = useRef<HTMLInputElement>(null)
    const password = useRef<HTMLInputElement>(null)
    const confirmPassword = useRef<HTMLInputElement>(null)
    const router = useRouter()

    const handleSubmit = async () => {
        try {
            if (!name.current?.value) {
                toast.info("name is required")
                return
            }
            else if (!email.current?.value) {
                toast.info("email is required")
                return
            }
            else if (!password.current?.value) {
                toast.info("password is required")
                return
            }
            else if (!confirmPassword.current?.value) {
                toast.info("confirm password is required")
                return
            }
            else if (confirmPassword.current?.value !== password.current?.value) {
                toast.info("password and confirm password not valid")
                return
            }

            const res = await fetch("http://localhost:3000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name.current?.value!,
                    email: email.current?.value!,
                    password: password.current?.value!,
                    confirmPassword: confirmPassword.current?.value!
                })
            })
            const data = await res.json();
            if(data){
                console.log(data);
                if(!data.error){
                    toast.success(data.message)
                    router.push("/login")
                }
                toast.error(data.error)
            }

        } catch (e: any) {
            console.log(e);
            toast.error(e.message)
        }
    }
    return (
        <div>
            <div className={style.login_wrapper}>
                <h3>Welcome</h3>
                <div>
                    <label htmlFor="name">Name</label>
                    <input ref={name} type="text" id='name' />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input ref={email} type="text" id='email' />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input ref={password} type="password" id='password' />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input ref={confirmPassword} type="password" id='confirmPassword' />
                </div>
                <button onClick={handleSubmit}>Sign Up</button>
                <p>Have an account? <Link href={"/login"}>Sign In</Link></p>
            </div>
        </div>
    )
}

export default RegisterPage