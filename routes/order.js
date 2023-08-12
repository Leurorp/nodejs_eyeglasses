import express from 'express'
import {v4 as uuidv4} from 'uuid'
import { Ordine } from '../models/ordine.js'
import { Occhiale } from '../models/user.js'
import mongoose from 'mongoose'

const router = express.Router()

router.post('/',async(req,res)=>{
    const ordine=req.body
    const newOrdine=new Ordine(ordine)
    try {await newOrdine.save()
    res.send('Ordine aggiunto con successo<br> Premi <a href="/authOrdine">qui</a> per proseguire con il pagamento')}
    catch (error) {res.status(409).json({message:error.message})}})

router.get('/:idCliente',async(req,res)=>{
    const {idCliente}=req.params
    try {const ordine=await Ordine.find({idCliente:idCliente})
    res.status(200).json(ordine)}
    catch (error){res.status(404).json({message: error.message})}})

router.get('/:idOcchiale',async(req,res)=>{
    const {idOcchiale}=req.params
    try {const occhiale=await Occhiale.find({idOcchiale:idOcchiale})
    res.status(200).json(occhiale)}
    catch (error){res.status(404).json({message: error.message})}})

export default router