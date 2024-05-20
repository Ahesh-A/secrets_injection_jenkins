import express, { Express } from "express";

export const app: Express = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send("This is the front page")
})

app.post('/say-hello', (req, res) => {
    const {name} = req.body
    res.send(`Hello ${name}`);
})

export const server = app.listen(PORT, () => {
    console.log(`app listening to port ${PORT}`);
})