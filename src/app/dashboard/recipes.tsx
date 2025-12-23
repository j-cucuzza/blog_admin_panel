'use client'
import { useEffect, useState } from "react"
import * as api from '../util/api'
import { useRouter } from "next/navigation"
import { Recipe, Tag, ModalMetaData, CreateRecipe } from "../types"
import DeleteModal from "./deleteModal"

const defaultMetaData = {
    type: "Recipe",
    name: "",
    id: -1
}

const Recipes = () => {
    const router = useRouter()
    const [recipes, setRecipes] = useState<Recipe[]>([])
    const [tags, setTags] = useState<Tag[]>([])
    const [loading, setLoading] = useState(false)
    const [filter, setFilter] = useState("")
    const [modalActive, setModalActive] = useState(false)
    const [modalMetaData, setModalMetaData] = useState<ModalMetaData>(defaultMetaData)

    useEffect(() => {
        setLoading(true)
        api.getRecipes()
            .then(r => {
                setRecipes(r)
            })
        api.getTags()
            .then(r => {
                setTags(r)
                setLoading(false)
            })
    }, [])

    const handleDeleteRecipe = (id: number) => {
        api.deleteRecipe(id)
            .then(r => {
                setRecipes(recipes.filter((r) => r.id !== modalMetaData.id))
                setModalMetaData(defaultMetaData)
                setModalActive(false)
            })
            .catch((e) => {
                //TODO
            })
    }

    const handleHideRecipe = (hidden: boolean, id: string) => {
        api.hideRecipe(id, !hidden)
            .then(r => {
                setRecipes(recipes => recipes.map(recipe => 
                    recipe.id.toString() === id
                    ? { ...recipe, hidden: !hidden}
                    : recipe
                ))
            })
    }

    const handleRenderRecipes = () => {
        return recipes.filter((r, i) => filter === "" ? true : r.tag.name === filter).map((r, i) =>
            <div key={i} className="cell">
                <div className="message">
                    <div className="message-header">
                        {r.name}
                        <span className="tag is-medium is-info">
                            {r.tag.name}
                        </span>
                    </div>
                    <div className="message-body" style={{minHeight: "10rem"}}>
                        <ul style={{listStyleType: "none", minHeight: "4rem"}}>
                            <li>makes: {r.servings} servings</li>
                            <li>calories: {r.calories} per serving</li>
                            <li>protein: {r.protein}g</li>
                        </ul>
                        <br />
                        <nav className="level is-mobile">
                            <button className="button" onClick={() => router.push(`/dashboard/editRecipe?id=${r.id}`)}>Edit</button>
                            <button   className={`button ${r.hidden ? "is-warning" : ""}`} onClick={() => handleHideRecipe(r.hidden, r.id.toString())}>Hide</button>
                            {/* <label className="checkbox">
                                <input type="checkbox" checked={r.hidden}
                                onChange={() => handleHideRecipe(r.hidden, r.id.toString())}/>
                                Hidden
                            </label> */}
                            <button className="button" onClick={() => {
                            setModalActive(true)
                            setModalMetaData({...modalMetaData, name: r.name, id: r.id})
                            }}>Delete</button>
                        </nav>
                    </div>
                    
                </div>
{/*                 
                <div className="card">
                    <header className="card-header">
                        <p className="card-header-title">{r.name}</p>
                        <button className="card-header-icon" aria-label="more options">
                        <span className="tag is-medium is-info">
                            {r.tag.name}
                        </span>
                        </button>
                    </header>
                    <div className="card-content">
                        <div className="content">
                            <ul style={{listStyleType: "none"}}>
                                <li>makes: {r.servings} servings</li>
                                <li>calories: {r.calories} per serving</li>
                                <li>protein: {r.protein}g</li>
                            </ul>
                        </div>
                    </div>
                    <footer className="card-footer">
                        <a href="#" className="card-footer-item">Edit</a>
                        <a href="#" className="card-footer-item" onClick={() => {
                            setModalActive(true)
                            setModalMetaData({...modalMetaData, name: r.name, id: r.id})
                            }}>Delete</a>
                    </footer>
                </div> */}
            </div>
        )
    }

    return (
        <>
            {loading ? <></>
            :   <div>
                    <DeleteModal active={modalActive} 
                        setModalActive={setModalActive} 
                        metaData={modalMetaData} 
                        deleteItem={() => handleDeleteRecipe(modalMetaData.id)}/>
                    <div className="fixed-grid has-3-cols has-1-cols-mobile" style={{margin: "1rem"}}>
                        <nav className="level">
                            <button className="button is-primary" onClick={() => router.push('/dashboard/newRecipe')}>Create New Recipe</button>
                            
                            <div className="select">
                                <select onChange={e => setFilter(e.target.value)}>
                                    <option value="">Select Filter</option>
                                    {tags.map((t, i) => <option key={i} value={t.name}>{t.name}</option>)}
                                </select>
                            </div>
                        </nav>
                        <div className="grid">
                            {handleRenderRecipes()}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Recipes