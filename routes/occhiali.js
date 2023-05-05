import express from 'express'
import {v4 as uuidv4} from 'uuid'

const router = express.Router()

let occhiali = [{id:"1",nome:"bianco",gender:"maschio",materiale:"plastica"},
                {id:"2",nome:"verde",gender:"maschio",materiale:"titanio"}]
  
router.get('/',(req,res)=>{ 
    res.json(occhiali)
    console.log(occhiali)})

router.post('/',(req,res)=>{
    const occhiale=req.body
    console.log(occhiale)
    occhiali.push({...occhiale, id:uuidv4()})
    res.send('Occhiale aggiunto con successo<br> Premi <a href="catalogo.html">qui</a> per la homepage')})

router.delete('/:id',(req,res)=>{
    const{id}=req.params
    const index=occhiali.findIndex(occhiale=>occhiale.id===id)
    occhiali.splice(index,1)
    res.status(200).json({success:true, data:occhiali})})

router.post('/:id',(req,res)=>{
    const {id} = req.params
    const newOcchiale=req.body
    for (let i=0; i<occhiali.length; i++) {
        let occhiale=occhiali[i]
        if (occhiale.id==id) {
            occhiali[i]=newOcchiale}}
    res.send(`occhiale con id ${id} modificato con successo!<br>
        <a href="../catalogo.html">Torna al catalogo</a>`)})

router.get('/:id',(req,res)=>{
    const {id}=req.params
    const occhiale=occhiali.find((occhiale)=>occhiale.id===id)
    if (occhiale) {res.send(occhiale)}
    else {res.status(404).send('occhiale non trovato')}
})
export default router