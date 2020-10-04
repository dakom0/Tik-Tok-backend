import express from 'express'
import mongoose from 'mongoose'
import data from './data.js'
import Videos from './dbModel.js'
import dotenv from 'dotenv'
import cors from 'cors'

// app config
const app = express();
const port = process.env.PORT || 8000;
dotenv.config()

// middlewares
app.use(express.json())
app.use(cors())
app.use((req, res, next) =>{
    res.setHeader('Access-Contro-Allow-Origin','*'),
    res.setHeader('Access-Control-Allow-Headers','*'),
    next()
})

// DB config
const conn = process.env.CONN_URL;

mongoose.connect(conn,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

// api endpoints
app.get('/', (req, res)=> res.status(200).send('hello guys'));

app.get('/v1/posts', (req, res)=> res.status(200).send(data));

app.get('/v2/posts', (req, res)=> {

    Videos.find((err, data) => {
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
});


app.post('/v2/posts', (req, res)=> {
    const dbVideos = req.body

    Videos.create(dbVideos, (err, data) => {
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
});


// listen
app.listen(port, ()=>console.log(`listening on localhost: ${port}`))
