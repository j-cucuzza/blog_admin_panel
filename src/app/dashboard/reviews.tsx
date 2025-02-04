'use client'
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import * as api from '../util/api'
import { Review, Cuisine, ModalMetaData } from "../types"
import DeleteModal from "./deleteModal"

const defaultMetaData = {
    type: "Review",
    name: "",
    id: -1
}

const Reviews = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [filter, setFilter] = useState("")
    const [reviews, setReviews] = useState<Review[]>([])
    const [cuisines, setCuisines] = useState<Cuisine[]>([])
    const [modalActive, setModalActive] = useState(false)
    const [modalMetaData, setModalMetaData] = useState<ModalMetaData>(defaultMetaData)


    useEffect(() => {
        setLoading(true)
        api.getReviews()
            .then(r => {
                setReviews(r)
            })
        api.getCuisines()
            .then(r => {
                setCuisines(r)
                setLoading(false)
            })
    }, [])

    const handleDeleteReview = (id: number) => {
        api.deleteReview(id)
            .then(r => {
                setReviews(reviews.filter((r) => r.id !== modalMetaData.id))
                setModalMetaData(defaultMetaData)
                setModalActive(false)
            })
            .catch((e) => {
                //TODO
            })
    }

    const handleRenderRating = (score: number) => {
        return (
            <div>
                {Array.from({ length: score }).map((_, index) => (
                    <span key={index} className="icon">
                        <i className="fa-solid fa-star"></i>
                    </span>
                ))}
            </div>
        )
    }

    const handleRenderReviews = () => {
        return reviews.filter((r, i) => filter === "" ? true : r.cuisine.name === filter)
            .sort((r, r2) => Number(r2.visited) - Number(r.visited) || r.name.localeCompare(r2.name)) 
            .map((r, i) => 
            <div key={i} className="cell">
                <div className="message">
                    <div className="message-header">
                        {r.name}
                        <span className="tag is-medium is-info">
                            {r.cuisine.name.charAt(0).toUpperCase() + r.cuisine.name.slice(1)}
                        </span>
                    </div>
                    <div className="message-body" style={{minHeight: "14rem"}}>
                        <nav className="level">
                            <p>{r.address}</p>
                                
                            <div>
                                {r.rating ?
                                    <>{handleRenderRating(r.rating)}</>
                                : <></>}
                            </div>
                            
                            <p>
                                {r.visited 
                                    ?   <span className="tag is-medium is-primary">
                                            Visited
                                        </span> 
                                    :   <span className="tag is-medium is-warning">
                                            Not Visited
                                        </span>
                                }
                            </p>
                        </nav>

                        <div style={{minHeight: "6rem", overflowY: "scroll"}}>
                            {r.notes}
                        </div>
                        <br />
                        <nav className="level is-mobile">
                            <button className="button">Edit</button>
                            <button className="button" onClick={() => {
                                setModalActive(true)
                                setModalMetaData({...modalMetaData, name: r.name, id: r.id})
                            }}>Delete</button>
                        </nav>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            {loading ? <></>
            :
            <div>
                <DeleteModal active={modalActive}
                    setModalActive={setModalActive}
                    metaData={modalMetaData}
                    deleteItem={() => handleDeleteReview(modalMetaData.id)}/>
                <div className="fixed-grid has-2-cols has-1-cols-mobile" style={{margin: "1rem"}}>
                    <nav className="level">
                        <button className="button is-primary" onClick={() => router.push('/dashboard/newReview')}>Create New Review</button>
                        <div className="select">
                            <select onChange={e => setFilter(e.target.value)}>
                                <option value="">Select Filter</option>
                                {cuisines.sort((c1, c2) => c1.name.localeCompare(c2.name))
                                    .map((c, i) =>
                                        <option key={i} value={c.name}>{c.name.charAt(0).toUpperCase() + c.name.slice(1)}
                                        </option>)
                                }
                            </select>
                        </div>
                    </nav>
                    <div className="grid">
                        {handleRenderReviews()}
                    </div>
                </div>
            </div>
            }
        </>
    )
}

export default Reviews