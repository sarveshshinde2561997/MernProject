import React, { useEffect } from 'react'
import axios from 'axios'
export default function About() {

    useEffect(() => {

        axios.get('http://localhost:8000/about').then((res) => {
            console.log(res);
        })
    }, [])
    return (
        <div>
            <h1>About</h1>
        </div>
    )
}
