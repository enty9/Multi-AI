import { useState } from "react";

export const UsePost =  (url, input) => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

    try {
        const response = fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({msg: input})
        })
        const result = response.json()
        setData(result['data'])
    } catch(err){
        setError(err)
    }

    return {data, error}
}