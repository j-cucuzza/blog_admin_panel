import { CreateRecipe } from "../types"

const API_ROOT = "https://www.dippingsauce.net/api"
// const API_ROOT = "http://127.0.0.1:8000"


class ApiError extends Error {
    cause: string
  
    constructor(cause: string, err: any, ...params: any) {
      super(...params)
  
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, ApiError)
      }
  
      this.name = "ApiError"
      this.cause = cause
      this.message = err
    }
  
}

enum APIMethod {
    get = "get",
    post = "post",
    put = "put",
    patch = "patch",
    delete = "delete",
    create = "create"
}

enum ApiErrors {
    BadToken = "Bad Token",
    CallFailed = "Call Failed",
    LimitExceeded = "Limit Exceeded"
}
/**
 * 
 *  authorization
 * 
 */
const login = (username: string, password: string) => {
    const endpoint = "/auth/token"
    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "accept": "application/json",
    }

    const body = new URLSearchParams()
    body.append("grant_type", "password")
    body.append("username", username)
    body.append("password", password)
    body.append("scope", "")
    body.append("client_id", "")
    body.append("client_secret", "")


    return fetch(`${API_ROOT}${endpoint}`, 
        {
            method: APIMethod.post,
            headers,
            body: body.toString(),
        })
        .then(r => {
            if (r.ok) {
                return r.json()
            } else if (r.status === 402) {
                throw new ApiError(ApiErrors.LimitExceeded, "")
            }
            let err
            r.json().then().then(json =>{
                err = json
            })
            throw new ApiError(ApiErrors.CallFailed, err)
        })
}

const validateToken = () => {
    const token = sessionStorage.getItem("token")
    const endpoint = "/auth/me"
    const headers = {
        accept: "application/json",
        Authorization: "Bearer " + token
    }

    
    return fetch(`${API_ROOT}${endpoint}`, 
    {
        method: APIMethod.get,
        headers,
    })
    .then(r => {
        if (r.ok) {
            return r.json()
        } else if (r.status === 402) {
            throw new ApiError(ApiErrors.LimitExceeded, "")
        } else if (r.status === 404) {
            return {error: r.status}
        }
        let err
        r.json().then().then(json =>{
            err = json
        })
        throw new ApiError(ApiErrors.CallFailed, err)
    })
}


/**
 * 
 *  recipes
 * 
 */
const getRecipes = () => {
    const endpoint = "/recipes/all/"    

    return fetch(`${API_ROOT}${endpoint}`, 
        {
            method: APIMethod.get,
        })
        .then(r => {
            if (r.ok) {
                return r.json()
            } else if (r.status === 402) {
                throw new ApiError(ApiErrors.LimitExceeded, "")
            }
            let err
            r.json().then().then(json =>{
                err = json
            })
            throw new ApiError(ApiErrors.CallFailed, err)
    })
}

const createRecipe = (body: CreateRecipe) => {
    const endpoint = "/recipes/create/"

    const token = sessionStorage.getItem("token")
    const headers = {
        'Content-Type': 'application/json',
        accept: "application/json",
        Authorization: "Bearer " + token
    }

    const newBody = new URLSearchParams()
    newBody.append("name", body.name)
    newBody.append("servings", body.servings.toString())
    newBody.append("calories", body.calories.toString())
    newBody.append("protein", body.protein.toString())
    newBody.append("tag_id", body.tag_id.toString())
    newBody.append("ingredients", body.ingredients)
    newBody.append("instructions", body.instructions)



    return fetch(`${API_ROOT}${endpoint}`, 
    {
        method: APIMethod.post,
        headers,
        body: JSON.stringify(body),
    })
    .then(r => {
        if (r.ok) {
            return r.json()
        } else if (r.status === 402) {
            throw new ApiError(ApiErrors.LimitExceeded, "")
        }
        let err
        r.json().then().then(json =>{
            err = json
        })
        throw new ApiError(ApiErrors.CallFailed, err)
    })


}

const deleteRecipe = (id: number) => {
    const endpoint = `/recipes/${id}`
    const token = sessionStorage.getItem('token')

    const headers = {
        Authorization: "Bearer " + token
    }

    return fetch(`${API_ROOT}${endpoint}`,
        {
            headers,
            method: APIMethod.delete,
        })
        .then(r => {
            if (r.ok) {
                return r.json()
            } else if (r.status === 402) {
                throw new ApiError(ApiErrors.LimitExceeded, "")
            }
            let err
            r.json().then().then(json =>{
                err = json
            })
            throw new ApiError(ApiErrors.CallFailed, err)
    })

}

const getTags = () => {
    const endpoint = "/recipes/tags/"

    return fetch(`${API_ROOT}${endpoint}`,
        {
            method: APIMethod.get,
        })
        .then(r => {
            if (r.ok) {
                return r.json()
            } else if (r.status === 402) {
                throw new ApiError(ApiErrors.LimitExceeded, "")
            }
            let err
            r.json().then().then(json =>{
                err = json
            })
            throw new ApiError(ApiErrors.CallFailed, err)
    })
}


/**
 * 
 *  reviews
 * 
 */
const getReviews = () => {
    const endpoint = "/reviews/all/"

    return fetch(`${API_ROOT}${endpoint}`,
        {
            method: APIMethod.get,
        })
        .then(r => {
            if (r.ok) {
                return r.json()
            } else if (r.status === 402) {
                throw new ApiError(ApiErrors.LimitExceeded, "")
            }
            let err
            r.json().then().then(json =>{
                err = json
            })
            throw new ApiError(ApiErrors.CallFailed, err)
    })    
}

const getCuisines = () => {
    const endpoint = "/reviews/cuisines/"


    return fetch(`${API_ROOT}${endpoint}`,
    {
        method: APIMethod.get,
    })
    .then(r => {
        if (r.ok) {
            return r.json()
        } else if (r.status === 402) {
            throw new ApiError(ApiErrors.LimitExceeded, "")
        }
        let err
        r.json().then().then(json =>{
            err = json
        })
        throw new ApiError(ApiErrors.CallFailed, err)
}) 

}
export {
    login,
    validateToken,
    getRecipes,
    getTags,
    createRecipe,
    deleteRecipe,
    getReviews,
    getCuisines
}