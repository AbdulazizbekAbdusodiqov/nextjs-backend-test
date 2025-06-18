import React, { useRef } from 'react'
import style from "./login.module.scss"
import Link from 'next/link'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

const LoginPage = () => {
  const email = useRef<HTMLInputElement>(null)
  const password = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const handleSubmit = async () => {
    try {
      if (!email.current?.value) {
        toast.info("email is required")
        return
      }
      else if (!password.current?.value) {
        toast.info("password is required")
        return
      }
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email.current?.value!,
          password: password.current?.value!,
        })
      })
      console.log("hi");
      
      const data = await res.json();
      if (data) {
        console.log(data);
        if (!data.error) {
          toast.success(data.message)
          localStorage.setItem("accessToken", data.token)
          router.push("/")
        }
        toast.error(data.error)
      }
    } catch (error: any) {
      console.log(error);
      toast.info(error.message)
    }
  }
  return (
    <div>
      <div className={style.login_wrapper}>
        <h3>Welcome</h3>
        <div>
          <label htmlFor="email">Email</label>
          <input ref={email} type="text" id='email' />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input ref={password} type="password" id='password' />
        </div>
        <button onClick={handleSubmit}>Sign In</button>
        <p>Don't have an account? <Link href={"/register"}>Sign up</Link></p>
      </div>
    </div>
  )
}

export default LoginPage