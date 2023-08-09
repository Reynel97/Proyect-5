import axios from "axios";
import { useState } from "react";


const useFetch = (url) => {
  
    const [infoApi, setInfoApi] = useState();
    const [hasError, setHasError] = useState(false)

    const getApi = () => {

        axios.get(url)
        .then( res => {
            setInfoApi(res.data)
            setHasError(false)
        })
        .catch( err => {
            console.log(err)
            setHasError(true)
        })
    }  
    
    const getTypeApi = (urlType) => {
        axios.get(urlType)
            .then(res => {
                const obj = {
                 results: res.data.pokemon.map(e => e.pokemon)
                }
            setInfoApi(obj)
            setHasError(false)
            })
            .catch(err =>{
                 console.log(err)
                 setHasError(true)   
                })
        }
   
    return [infoApi, getApi, getTypeApi, hasError]
}

export default useFetch