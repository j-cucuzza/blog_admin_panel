'use client'
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import * as api from "../../util/api"
import { CreateRecipe } from "@/app/types";
import Footer from "@/app/footer";
import RecipeForm from "@/app/components/recipeForm";

const baseRecipe: CreateRecipe = {
    name: "",
    servings: 0,
    calories: 0,
    protein: 0,
    ingredients: "| Quantity | Unit | Name |\n| --- | --- | --- |\n",
    instructions: "",
    tag_id: 0,
}

const NewRecipe = () =>  {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const handleCreateRecipe = (newR: CreateRecipe) => {
        api.validateToken()
        .then(r => {
            if (r.error === 404) {
                router.push("/")
            } else {
                api.createRecipe(newR)
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

    useEffect(() => {
        api.validateToken()
        .then(r => {
            if (r.error === 404) {
                router.push("/")
            }
            setLoading(false)
        })
        .catch((e) => {
            router.push("/")
        })
    }, [])

    return (
        <>
        <RecipeForm handleRecipe={handleCreateRecipe} initialRecipe={baseRecipe} />
        <Footer />
        </>
    )

}

export default NewRecipe