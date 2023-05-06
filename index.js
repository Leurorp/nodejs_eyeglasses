import express from 'express'
// import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import occhialiRouter from './routes/occhiali.js' 
import path from "path"
import bodyParser from 'body-parser'
import {v4 as uuidv4} from 'uuid'

let occhiali = [{id:"1",nome:"bianco",gender:"maschio",materiale:"plastica"},
                {id:"2",nome:"verde",gender:"maschio",materiale:"titanio"}]

const __dirname = path.resolve();

const app=express()
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.json())
dotenv.config()
const PORT=process.env.PORT
app.use(cors())

app.use('/eyes',occhialiRouter)

app.use(express.static('public'))

app.get('/',(req,res)=>{res.sendFile('home_page.html',{root: __dirname + "/public"})})
app.get('/catalogo',(req,res)=>{res.sendFile('catalogo.html',{root: __dirname + "/public"})})
app.get('/new',(req,res)=>{res.sendFile('form.html',{root: __dirname + "/public"})})
app.all('*',(req,res)=>{res.send('<h1>Pagina non trovata</h1>')})  
// mongoose.connect(process.env.CONNECTION_URL)
.then(()=>{
    app.listen(PORT,()=>{console.log(`server running on port ${PORT}`)})})
