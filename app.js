import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv'

dotenv.config()

const API_KEY = process.env.API_KEY
const app = express()

app.use(express.json())

app.post("/chat/completions", async(req, res) => {
    const { message } = req.body
    const options = {
        model: "gpt-3.5-turbo",
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            content: [
                {
                    role: "user",
                    content: message
                }
            ]
        })
    }
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        const data = await response.json()
        res.send(data.choices[0].message.content)
    } catch (error) {
        console.log(error)
    }
})

app.post("/generate/image", async(req, res) => {
    const { message } = req.body
    const options = {
        model: "gpt-3.5-turbo",
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            content: [
                {
                    role: "user",
                    content: message
                }
            ]
        })
    }
    try {
        const response = await fetch('https://api.openai.com/v1/images/generations', options)
        const data = await response.json()
        console.log(data)
        res.send(data)
    } catch (error) {
        console.log(error)
    }
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})