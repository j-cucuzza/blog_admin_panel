'use client'

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import styles from "../../page.module.css";
import Footer from "@/app/footer";
import * as api from "../../util/api"
import { CreateReview, Cuisine } from "@/app/types";
import ReviewForm from "@/app/components/reviewForm";

const baseReview: CreateReview = {
    name: "",
    address: "",
    visited: false,
    rating: null,
    notes: "",
    cuisine_id: 0,
    neighborhood: ""
}

const NewReview = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [cuisines, setCuisines] = useState<Cuisine[]>([])
    const [review, setReview] = useState(baseReview)
    const [error, setError] = useState("")

    const handleCreateReview = (newR: CreateReview) => {
        api.validateToken()
        .then(r => {
            if (r.error === 404) {
                router.push("/")
            } else {
                api.createReview(newR)
                .then((r) => {
                    router.push("/dashboard")
                })
                .catch((e) => {
                    console.log(e)
                    setError(e)
                })
            }
        })
    }

    return (
        <>
        <ReviewForm handleReview={handleCreateReview} initialReview={baseReview} />
        <Footer />
        </>
    )


}

export default NewReview