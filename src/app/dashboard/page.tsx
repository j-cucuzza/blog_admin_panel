'use client'
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import styles from "../page.module.css";
import * as api from "../util/api"
import Tabs from "./tabs";
import Recipes from "./recipes";
import Reviews from "./reviews";
import Posts from "./posts";

const Dashboard = () => {
    const router = useRouter()
    const [active, setActive] = useState("recipes")
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        api.validateToken()
        .then(r => {
            if (r.error === 404) {
                router.push("/")
            } else {
                setLoading(false)
            }
        })
        .catch((e) => {
            router.push("/")
        })
    }, [])

    return (
        <> 
            <div style={{display: "flex", minHeight: "100vh", flexDirection: "column"}}>
            {loading ? <></> 
                :<>
                    <Tabs active={active} setActive={(str) => setActive(str)}/>
                    <div className="container">
                        {active === "recipes" ? <Recipes /> 
                            : (active === "reviews") ? <Reviews /> 
                            : (active === "posts" ? <Posts /> 
                            : <Recipes />)}
                    </div>
                </>
            }
            </div>
            <br />
        </>
    )
}

export default Dashboard