'use client'
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import styles from "../../page.module.css";
import * as api from "../../util/api"
import { CreateRecipe, Tag } from "@/app/types";

const baseRecipe: CreateRecipe = {
    name: "",
    servings: 0,
    calories: 0,
    protein: 0,
    ingredients: "",
    instructions: "",
    tag_id: 0,
}

const NewRecipe = () =>  {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [tags, setTags] = useState<Tag[]>([])
    const [recipe, setRecipe] = useState(baseRecipe)
    const [error, setError] = useState("")

    const handleCreateRecipe = () => {
        api.validateToken()
        .then(r => {
            if (r.error === 404) {
                router.push("/")
            } else {
                api.createRecipe(recipe)
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
        
        api.getTags()
            .then(r => {
                setTags(r)
                setLoading(false)
            })
    }, [])

    return (
        <div className={styles.page}style={{display: "flex", minHeight: "100vh", flexDirection: "column"}}>
            <div className="container">
                <button className="button is-primary" onClick={() => router.back()}>Back</button>
                <div className={styles.main}>
                    <div className="new-form">
                        <div className="field">
                            <label className="label">Name</label>
                            <div className="control">
                                <input className="input" type="text" placeholder="Recipe Name"
                                onChange={(e) => setRecipe({...recipe, name: e.target.value})} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Servings</label>
                            <div className="control">
                                <input className="input" type="number" placeholder="How many servings? "
                                onChange={(e) => setRecipe({...recipe, servings: parseInt(e.target.value)})} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Calories</label>
                            <div className="control">
                                <input className="input" type="number" placeholder="Calories per serving? "
                                onChange={(e) => setRecipe({...recipe, calories: parseInt(e.target.value)})} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Protein</label>
                            <div className="control">
                                <input className="input" type="number" placeholder="Protein(g) per serving? "
                                onChange={(e) => setRecipe({...recipe, protein: parseInt(e.target.value)})} />
                            </div>
                        </div>                 
                        <div className="field">
                        <label className="label">Tag</label>
                        <div className="control">
                            <div className="select">
                            <select onChange={(e) => setRecipe({...recipe, tag_id: parseInt(e.target.value)})}>
                                <option value="">Select Tag</option>
                                {tags.map((t, i) => <option key={i} value={t.id}>{t.name}</option>)}
                            </select>
                            </div>
                        </div>
                        </div>
                        <div className="field">
                            <label className="label">Ingredients</label>
                            <div className="control">
                                <textarea className="textarea" placeholder="List the Ingredients in Markdown Format" 
                                onChange={(e) => setRecipe({...recipe, ingredients: e.target.value})} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Instructions</label>
                            <div className="control">
                                <textarea className="textarea" placeholder="List the Ingredients in Markdown Format" 
                                onChange={(e) => setRecipe({...recipe, instructions: e.target.value})} />
                            </div>
                        </div>
                        <div className="field">
                        <div className="control">
                            <button className="button is-link"
                            onClick={() => handleCreateRecipe()}>Submit</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default NewRecipe