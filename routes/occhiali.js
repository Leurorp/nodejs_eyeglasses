import express from 'express'
import {v4 as uuidv4} from 'uuid'
import {Occhiale} from '../models/user.js'
import mongoose from 'mongoose'

const router = express.Router()

let occhiali = [{id:"1",nome:"bianco",gender:"maschio",materiale:"plastica"},
                {id:"2",nome:"verde",gender:"maschio",materiale:"titanio"}]
occhiali=[]
router.get('/',async(req,res)=>{ 
    try {const occhiali=await Occhiale.find()
    res.status(200).json(occhiali)
}
    catch(error){res.status(404).json({message:error.message})}})

router.post('/',async(req,res)=>{
    const occhiale=req.body
    if (occhiale.password!="ma") {return res.send('password errata<br><a href="form.html">Torna inidietro</a>')}
    const newOcchiale=new Occhiale(occhiale)
    console.log(occhiale)
    try {await newOcchiale.save()
    res.send('Occhiale aggiunto con successo<br> Premi <a href="/catalogo">qui</a> per la homepage')}
    catch (error) {res.status(409).json({message:error.message})}})

router.delete('/:id',async(req,res)=>{
    const{id}=req.params
    if (!mongoose.Types.ObjectId.isValid(id))
    {return res.status(404).json({message:'id non valido'})}
    try {await Occhiale.findByIdAndDelete(id)
    res.json({message:'utente eliminato con successo<br><a href="../catalogo>Torna alla home</a>'})}
    catch (error) {res.status(404).json({message:error.message})}})

router.post('/:id',async(req,res)=>{
    const {id} = req.params
    const newOcchiale={...req.body}
    if (newOcchiale.password!='ma') {return res.send('password errata<br><a href="/catalogo">Torna inidietro</a>')}
    if (!mongoose.Types.ObjectId.isValid(id))
    {return res.status(404).json({message:'id non presente'})}
    try { 
        const occhiale=await Occhiale.findByIdAndUpdate(id,newOcchiale,{new:true})
        res.send(`occhiale con id ${occhiale._id} modificato con successo<br><a href="http://127.0.0.1:3000/catalogo">Torna alla home</a>`)}
    catch (error) {res.status(404).json({message:error.message})}})

router.get('/:id',async(req,res)=>{
    const {id}=req.params
    try {const occhiale=await Occhiale.findById(id)
    res.status(200).json(occhiale)}
    catch (error){res.status(404).json({message: error.message})}})

export default router