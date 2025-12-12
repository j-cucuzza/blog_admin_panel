import { Suspense } from "react";
import EditRecipeClient from "@/app/components/editRecipeClient";

const EditRecipe = () => {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <EditRecipeClient />
            </Suspense>
        </>)
}

export default EditRecipe;