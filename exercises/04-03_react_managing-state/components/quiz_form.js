'use client'

import { useState } from "react"

export default function QuizForm(){
    const [answer, setAnswer] = useState('')
    const [error, setError] = useState(null)
    const [status, setStatus] = useState('typing')

    if (status === 'success') {
        return <h1 className="text-2xl font-bold text-green-700">That's right!</h1>
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setStatus('submitting')
        try {
            await submitForm(answer)
            setStatus('success')
        } catch (err) {
            setStatus('typing')
            setError(err)
        }
    }

    function handleTextareaChage(e) {
        setAnswer(e.target.value)
    }

    return (
        <>
        <h2 className="text-2xl mb-4">City quiz</h2>
        <p className="mb-4">
            In which city is there a billboard that turns air into drinkable warter?
        </p>
        <form onSubmit={handleSubmit}>
            <textarea value={answer} onChange={handleTextareaChage} disabled={status === 'submitting'}></textarea>
            <br/>
            <button disabled={answer.length === 0 || status === 'submitting'}>Submit</button>
            {
                error !== null &&
                <p className="font-bold text-red-800">{error.message}</p>
            }
        </form>
        </>
    )
}

function submitForm(answer) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let shouldError = answer.toLowerCase() !== 'lima'
            if (shouldError) {
                reject(new Error(`${answer} is good guess but a wrong anser. Try again!`))
            } else {
                resolve()
            }
        }, 1500);
    })
}