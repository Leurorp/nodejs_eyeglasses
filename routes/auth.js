import express from 'express'
import {register, login, primoLogin} from '../controllers/auth.js'

const routerAuth=express.Router()

routerAuth.post('/register',register)//in realtà la rotta register/register è agganciata alla funzione register
routerAuth.post('/login',login)//la rotta register/login è agganciata alla funzione login
routerAuth.post('/primoLogin',primoLogin)

export default routerAuth