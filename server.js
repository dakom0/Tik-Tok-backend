import express from 'express'
import mongoose from 'mongoose'
import data from './data.js'
import Videos from './dbModel.js'

// app config
const app = express();
const port = process.env.PORT || 8000;

// middlewares
app.use(express.json())
app.use((req, res, next) =>{
    res.setHeader('Access-Contro-Allow-Origin','*'),
    res.setHeader('Access-Contro-Allow-Headers','*'),
    next()
})

// DB config
const conn = 'mongodb+srv://dakom1:tiktok@cluster0.n0sns.mongodb.net/tik-tok?retryWrites=true&w=majority';

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