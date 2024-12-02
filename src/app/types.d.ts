

type Tag = {
    id: number,
    name: string
}

type Recipe = {
    name: string,
    servings: number,
    calories: number,
    protein: number,
    ingredients: string,
    instructions: string,
    tag_id: number,
    tag: Tag,
    id: number,
}

type CreateRecipe = {
    name: string,
    servings: number,
    calories: number,
    protein: number,
    ingredients: string,
    instructions: string,
    tag_id: number,
}

type Cuisine = {
    name: string,
    id: int,
}

type Review = {
    name: string,
    address: string,
    visited: boolean,
    rating: number | null,
    notes: string,
    id: number,
    cuisine_id: number,
    cuisine: Cuisine,
}

type CreateReview = {
    name: string,
    address: string,
    visited: boolean,
    rating: number | null,
    notes: string,
    id: number,
    cuisine_id: number,
}

type ModalMetaData = {
    type: string,
    name: string,
    id: number,
}

export {
    Tag,
    Recipe,
    CreateRecipe,
    ModalMetaData,
    Review,
    CreateReview,
    Cuisine
}