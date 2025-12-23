import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import styles from "../page.module.css"
import * as api from "@/app/util/api"
import { CreateReview, Cuisine } from "@/app/types";


type ReviewFormProps =
    {
        initialReview: CreateReview,
        handleReview: (r: CreateReview) => (void)
    }

const ReviewForm = (props: ReviewFormProps) => {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [cuisines, setCuisines] = useState<Cuisine[]>([])
    const [review, setReview] = useState(props.initialReview)

    useEffect(() => {
        api.validateToken()
        .then(r => {
            if (r.error === 404) {
                router.push("/")
            }
        })
        .catch((e) => {
            router.push("/")
        })
        
        api.getCuisines()
            .then(r => {
                setCuisines(r)
                setLoading(false)
            })
    }, [])

    return (
        <div className={styles.page}style={{display: "flex", minHeight: "100vh", flexDirection: "column"}}>
            <div className="container">
                <button className="button is-primary" onClick={() => router.back()}>Back</button>
                <div>
                    <div className="new-form">
                        <div className="field">
                            <label className="label">Name</label>
                            <div className="control">
                                <input className="input" 
                                    type="text" 
                                    placeholder="Restaurant Name"
                                    value = {review.name != "" ? review.name : ""}
                                onChange={(e) => setReview({...review, name: e.target.value})} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Address</label>
                            <div className="control">
                                <input className="input" 
                                    type="text" 
                                    placeholder="1234 Street Name"
                                    value = {review.address != "" ? review.address : ""}
                                onChange={(e) => setReview({...review, address: e.target.value})} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Neighborhood</label>
                            <div className="control">
                                <input className="input" 
                                    type="text" 
                                    placeholder="Wicker Park"
                                    value = {review.neighborhood != "" ? review.neighborhood : ""}
                                onChange={(e) => setReview({...review, neighborhood: e.target.value})} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Visited</label>
                            <div className="control">
                                <div className="b-checkbox is-warning">
                                    <input id="checkbox" 
                                        className="styled" 
                                        type="checkbox" 
                                        checked={review.visited}
                                    onChange={(e) => setReview({...review, visited: !review.visited})}/>
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Rating</label>
                            <div className="control">
                                <input className="input" 
                                    disabled={review.visited ? false : true} 
                                    type="number" 
                                    placeholder="Was it 5 Stars?"
                                    value = {review.rating ? review.rating : ""}
                                onChange={(e) => setReview({...review, rating: parseInt(e.target.value)})} />
                            </div>
                        </div>                 
                        <div className="field">
                        <label className="label">Cuisine</label>
                        <div className="control">
                            <div className="select">
                            <select value={review.cuisine_id} 
                                    onChange={(e) => setReview({...review, cuisine_id: parseInt(e.target.value)})}>
                                <option value="">Select Cuisine</option>
                                {cuisines.map((c, i) => <option key={i} value={c.id}>{c.name}</option>)}
                            </select>
                            </div>
                        </div>
                        </div>
                        <div className="field">
                            <label className="label">Notes</label>
                            <div className="control">
                                <textarea className="textarea" 
                                    disabled={review.visited ? false : true} 
                                    placeholder="Write the Review Here!" 
                                    value = {review.notes != "" ? review.notes : ""}
                                onChange={(e) => setReview({...review, notes: e.target.value})} />
                            </div>
                        </div>
                        <div className="field">
                        <div className="control">
                            <button className="button is-link"
                            onClick={() => props.handleReview(review)}>Submit</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewForm