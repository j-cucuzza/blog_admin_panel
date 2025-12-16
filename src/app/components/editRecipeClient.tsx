"use client"
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import * as api from "../util/api"
import { CreateRecipe } from "../types";
import RecipeForm from "./recipeForm";

const baseRecipe: CreateRecipe = {
    name: "",
    servings: 0,
    calories: 0,
    protein: 0,
    ingredients: "| Quantity | Unit | Name |\n| --- | --- | --- |\n",
    instructions: "",
    tag_id: 0,
}
const EditRecipeClient = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const recipeId = String(searchParams.get("id") ? searchParams.get("id") : "")
    const [loading, setLoading] = useState(false)
    const [recipe, setRecipe] = useState(baseRecipe)
    const [error, setError] = useState("")

    useEffect(() => {
        setLoading(true)
        api.getRecipe(recipeId)
            .then(r => {
                setRecipe(r)
                setLoading(false)
            })
    }, [])

    const handleEditRecipe = (editedR: CreateRecipe) => {
        api.validateToken()
        .then(r => {
            if (r.error === 404) {
                router.push("/")
            } else {
                api.editRecipe(editedR, recipeId)
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
                <>Loading...</> :
                <RecipeForm initialRecipe={recipe} handleRecipe={handleEditRecipe}/>
            }</>)
}

export default EditRecipeClient;