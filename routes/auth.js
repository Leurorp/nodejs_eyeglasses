import express from 'express'
import {register, login, primoLogin, datiUser} from '../controllers/auth.js'

const routerAuth=express.Router()

routerAuth.post('/register',register)//in realtà la rotta register/register è agganciata alla funzione register
routerAuth.post('/login',login)
routerAuth.post('/primoLogin',primoLogin)
routerAuth.post('/datiUser',datiUser)

export default routerAuth