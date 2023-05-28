import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'//per usare le chiavi in .env
import occhialiRouter from './routes/occhiali.js'
import occhialiRouterAuth from './routes/auth.js'  
import path from "path"
import bodyParser from 'body-parser'
import { authToken } from './middleware/authToken.js'
import cookieParser from 'cookie-parser'
import {v4 as uuidv4} from 'uuid'

let occhiali_ = [{id:"1",nome:"bianco",gender:"maschio",materiale:"plastica"},
                {id:"2",nome:"verde",gender:"maschio",materiale:"titanio"}]

const __dirname = path.resolve();

const app=express()
app.use(cookieParser())// per passare il token tra i percorsi
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.json())
dotenv.config()//per usare le chiavi in .env
const PORT=process.env.PORT
app.use(cors())

app.set('view engine', 'ejs')//modulo per includere pagine html in altri layout html
app.use('/register',occhialiRouterAuth)//aggancia il modulo occhialiRouterAuth alla rotta register
app.use('/eyes',occhialiRouter)//aggancia il modulo occhialiRouter alla rotta eyes
app.get('/',(req,res)=>{res.render('index')})
app.get('/catalogo',(req,res)=>{res.render('catalogo.ejs')})
app.get('/login',(req,res)=>{res.render('login.ejs')})

app.get('/authCatalogo',authToken,(req,res)=>{res.render('login/authCatalogo.ejs')})
app.get('/authHome',authToken,(req,res)=>{res.render('login/authHome.ejs',)})
app.get("/logout", (req, res) => {
    res.cookie("jwt", "", { maxAge: "1" })// azzera il cookie jwt
    res.clearCookie("jwt") // pulisce il cookie jwt
    res.redirect("/")})

app.use(express.static('public'))//middleware per utilizzo file statici html
app.get('/new',(req,res)=>{res.sendFile('form.html',{root: __dirname + "/public"})})
app.all('*',(req,res)=>{res.send('<h1>Pagina non trovata</h1>')}) 

mongoose.connect(process.env.CONNECTION_URL)
.then(()=>{
    app.listen(PORT,()=>{console.log(`server running on port ${PORT}`)})})
.catch (error=>console.error('Errore connessione: '+error))

