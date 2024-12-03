'use client'
import Image from "next/image";
import styles from "./page.module.css";
import * as api from "./util/api"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "./footer";

export default function Home() {
    const [loading, setLoading] = useState(false)
    const [token, setToken] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const router = useRouter()

    const handleLogin = () => {
        setLoading(true)
        api.login(username, password)
            .then(r => {
                setToken(r.access_token)
                setError("")
                setLoading(false)
                router.push('/dashboard')
            })
            .catch((e) => {
                setError("Invalid username or password.")
                setLoading(false)
            })
    }

    useEffect(() => {
        console.log(token)
        sessionStorage.setItem("token", token)
    },[token])

    return (
        <main className="hero is-fullheight">
            <div className="container is-max-tablet is-flex is-justify-content-center is-align-items-center has-text-centered">
              <div className="">
                <p className="title is-1">Welcome</p>
                <div className="field">
                  <div className="control">
                    <input className="input" type="text" onChange={(e) => setUsername(e.target.value)} placeholder="username" />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <input className="input" type="password" onChange={(e) => setPassword(e.target.value)} placeholder="password" />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <button className="button is-primary" onClick={handleLogin}>login</button>
                  </div>
                </div>
              </div>
            </div>
          <Footer />
        </main>
    );
}