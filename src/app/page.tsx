'use client'
import Image from "next/image";
import styles from "./page.module.css";
import * as api from "./util/api"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
    <div className={styles.page}>
        <main className={styles.main}>
            <input className="input" type="text" onChange={(e) => setUsername(e.target.value)} placeholder="username" />
            <input className="input" type="password" onChange={(e) => setPassword(e.target.value)} placeholder="password" />
            <button className="button is-primary" onClick={handleLogin}>login</button>
        </main>
        <footer className={styles.footer}>
        </footer>
    </div>
    );
}


{/* <Image
className={styles.logo}
src="/next.svg"
alt="Next.js logo"
width={180}
height={38}
priority
/>
<ol>
<li>
  Get started by editing <code>src/app/page.tsx</code>.
</li>
<li>Save and see your changes instantly.</li>
</ol>

<div className={styles.ctas}>
<a
  className={styles.primary}
  href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
  target="_blank"
  rel="noopener noreferrer"
>
  <Image
    className={styles.logo}
    src="/vercel.svg"
    alt="Vercel logomark"
    width={20}
    height={20}
  />
  Deploy now
</a>
<a
  href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
  target="_blank"
  rel="noopener noreferrer"
  className={styles.secondary}
>
  Read our docs
</a>
</div> */}