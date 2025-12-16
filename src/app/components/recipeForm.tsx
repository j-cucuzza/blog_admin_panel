import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import styles from "@/app/page.module.css";
import * as api from "@/app/util/api"
import { CreateRecipe, Tag } from "@/app/types";

type RecipeFormProps =
    {
        initialRecipe: CreateRecipe,
        handleRecipe: (r: CreateRecipe) => (void)
    }

const RecipeForm = (props: RecipeFormProps) => {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [tags, setTags] = useState<Tag[]>([])
    const [recipe, setRecipe] = useState(props.initialRecipe)

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
        <>
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
                                    value={recipe.name != "" ? recipe.name : ""} 
                                    placeholder="Recipe Name"
                                    onChange={(e) => setRecipe({...recipe, name: e.target.value})} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Servings</label>
                            <div className="control">
                                <input className="input" 
                                    type="number" 
                                    value={recipe.servings != 0 ? recipe.servings : ""} 
                                    placeholder="How many servings? "
                                    onChange={(e) => setRecipe({...recipe, servings: parseInt(e.target.value)})} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Calories</label>
                            <div className="control">
                                <input className="input" 
                                    type="number" 
                                    value={recipe.calories != 0 ? recipe.calories : ""} 
                                    placeholder="Calories per serving? "
                                    onChange={(e) => setRecipe({...recipe, calories: parseInt(e.target.value)})} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Protein</label>
                            <div className="control">
                                <input className="input" 
                                    type="number" 
                                    value={recipe.protein != 0 ? recipe.protein : ""} 
                                    placeholder="Protein(g) per serving? "
                                    onChange={(e) => setRecipe({...recipe, protein: parseInt(e.target.value)})} />
                            </div>
                        </div>                 
                        <div className="field">
                        <label className="label">Tag</label>
                        <div className="control">
                            <div className="select">
                            <select value={recipe.tag_id} 
                                    onChange={(e) => setRecipe({...recipe, tag_id: parseInt(e.target.value)})}>
                                <option value={0}>Select Tag</option>
                                {tags.map((t, i) => <option key={i} value={t.id}>{t.name}</option>)}
                            </select>
                            </div>
                        </div>
                        </div>
                        <div className="field">
                            <label className="label">Ingredients</label>
                            <div className="control">
                                <textarea className="textarea" 
                                    value={recipe.ingredients} 
                                    placeholder="List the Ingredients in Markdown Format" 
                                    onChange={(e) => setRecipe({...recipe, ingredients: e.target.value})} />
                            </div>
                        </div>
                        <div className="control">
                            <button className="button is-link is-small"
                            onClick={() => setRecipe({...recipe, ingredients: recipe.ingredients + "\n| | | |"})}>Add Columns</button>
                        </div>
                        <div className="field">
                            <label className="label">Instructions</label>
                            <div className="control">
                                <textarea className="textarea" 
                                value={recipe.instructions != "" ? recipe.instructions : ""}
                                placeholder="List the Instructions in Markdown Format" 
                                onChange={(e) => setRecipe({...recipe, instructions: e.target.value})} />
                            </div>
                        </div>
                        <div className="field">
                        <div className="control">
                            <button className="button is-link"
                            onClick={() => props.handleRecipe(recipe)}>Submit</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default RecipeForm