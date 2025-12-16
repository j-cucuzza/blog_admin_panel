'use client'
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import * as api from "../util/api"
import { CreateReview, Cuisine } from "../types";
import ReviewForm from "./reviewForm";

const baseReview: CreateReview = {
    name: "",
    address: "",
    visited: false,
    rating: null,
    notes: "",
    cuisine_id: 0,
}

const EditReviewClient = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const reviewId = String(searchParams.get("id") ? searchParams.get("id") : "")
    const [loading, setLoading] = useState(true)
    const [review, setReview] = useState(baseReview)
    const [error, setError] = useState("")

    useEffect(() => {
        setLoading(true)
        api.getReview(reviewId)
            .then(r => {
                setReview(r)
                setLoading(false)
            })
    }, [])

    const handleEditReview = (editedR: CreateReview) => {
        api.validateToken()
            .then(r => {
                if (r.error === 404) {
                    router.push("/")
                } else {
                    api.editReview(editedR, reviewId)
                        .then((r) => {
                            router.push("/dashboard")
                        })
                        .catch((e) => {
                            console.log(e)
                            setError(e)
                            // TODO
                        })
                }
            })
    }

    

    return (
        <>
            {loading ?
                <>Loading... </> :
                <ReviewForm initialReview={review} handleReview={handleEditReview} />
            }</>)
}

export default EditReviewClient