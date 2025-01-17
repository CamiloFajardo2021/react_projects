import { useState ,useEffect} from "react"
import './App.css'

const CAT_ENDPOINT_RANDOM_FACT = "https://catfact.ninja/fact"
//const CAT_ENDPOINT_IMAGE_URL = "https://cataas.com/cat/says/${firstWord}?size=50&color=red"
const CAT_PREFIX_URL = "https://cataas.com"
export function App(){
    const [fact,setFact] = useState('default')
    const [imageUrl,setImageUrl] = useState()
    useEffect(()=>{
        fetch(CAT_ENDPOINT_RANDOM_FACT)
            .then(res=>res.json())
            .then(data=>{
                const { fact } = data
                setFact(fact)

                
            })
    },[])

    useEffect(()=>{
        if(!fact) return
        const firstWord = fact.split('',3).join('')
        fetch(`https://cataas.com/cat/says/${firstWord}?size=50&color=red&json=true`)
            .then(res=>res.json())
            .then(response=>{
                        
                const  url  = `/cat/says/${firstWord}?size=50&color=red`
                setImageUrl(url)
                console.log(url)
                        
            })
    },[fact])
    return (
      <main>
        <h1>App 1</h1>
        <section>

            {fact && <p>{fact}</p>}
            {imageUrl && <img src={`${CAT_PREFIX_URL}${imageUrl}`} alt={`image extracted using ${fact}$`}></img>}

        </section>
        
        
      </main>
        
    )
}