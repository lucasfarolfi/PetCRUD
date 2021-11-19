import api from "./api"

export const httpGet = () =>{
    return api()
        .get("/animais")
        .then(res =>{
            return res.data || []
        }).catch(e => {
            throw e
        })
}

export const httpDelete = (id) =>{
    return api()
        .delete("/animais/"+id)
        .then(res =>{
            return res.data
        }).catch(e => {
            throw e
        })   
}

export const httpPost = (a) =>{
    return api()
        .post("/animais", a).then(res =>{
            return res.data || {}
        }).catch(e => {
            throw e
        })
}

export const httpGetOne = (id) =>{
    return api()
        .get("/animais/"+id).then(res =>{
            return res.data || {}
        }).catch(e => {
            throw e
        })
}

export const httpPut = (id, a) =>{
    return api()
        .put("/animais/"+id, a).then(res =>{
            return res.data
        }).catch(e => {
            throw e
        })
}