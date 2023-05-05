import {v4 as uuidv4} from 'uuid'
let occhiali = [{id:"1",nome:"bianco",gender:"maschio",materiale:"plastica"},
                {id:"2",nome:"verde",gender:"maschio",materiale:"titanio"}]

export const getById = ('/:id',(req,res)=>{
    const {id}=req.params
    const occhialeTrovato=occhiali.find((occhiale)=>occhiale.id==id)
    res.send(occhialeTrovato)})
    
export const updateOcchiale = ('/:id',(req,res)=>{
    const{id}=req.params
    const{nome,gender,materiale}=req.body
    const occhialeTrovato=occhiali.find((occhiale)=>occhiale.id==id)
    if (!occhialeTrovato) {
        res.send('occhiale non esistente')
        return}
    if (nome) {occhialeTrovato.nome=nome}
    if (gender) {occhialeTrovato.gender=gender}
    if (materiale) {occhialeTrovato.materiale=materiale}
    res.send (`occhiale con id ${id} modificato con successo`)})
