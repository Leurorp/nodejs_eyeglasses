import express from 'express'
import dotenv from 'dotenv'
import {Client} from '../models/client.js'
import bcrypt from 'bcrypt'
import sgMail from '@sendgrid/mail'
import jwt from 'jsonwebtoken'

const routerAuth=express.Router()
dotenv.config()

export const register=async(req,res)=>{
    const{username,password,email}=req.body
    const allUsername=await Client.find()
        for (let oneuser of allUsername)
        {if (username==oneuser.username){
         return res.send('username già esistente.<br><a href="/login">Torna al login</a>')}}   
    if (!password || typeof password!='string')
        {return res.send('password non valida<br><a href="/login">Torna al login</a>')}
    if (password.length<1) {return res.send('password troppo corta<br><a href="/login">Torna al login</a>')}
    if (!email || typeof email!='string' )
        {return res.send('email non valida.<br><a href="/login">Torna al login</a>')}
        for (let oneemail of allUsername)
            {if (email==oneemail.email){
                const client=await Client.findOne({email})
                if (client.statoIscrizione=='1'){
                return res.send('email già esistente.<br><a href="/login">Torna al login</a>')}
                await Client.deleteOne({email:email})}}
    if (!username || typeof username!='string')
    {return res.send('username non valido<br><a href="/login">Torna al login</a>')}
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        const msg = {
        to: email, // Destinatario
        from: 'leuro.borsini@libero.it', // Mittente verificato
        subject: 'Conferma email',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<a href="http://127.0.0.1:3000/primoLogin.html">Per confermare la tua email clicca qui</a>',}
        sgMail.send(msg)
        .then(() => {
        console.log('Email sent')})
        .catch((error) => {console.error(error)})
        const passwordHashed=await bcrypt.hash(password,10)
        const client=new Client({username:username, password:passwordHashed, email:email, statoIscrizione:'0'})
        try{await client.save()
        res.status(201).json({status:'Vai nella tua email e confermala!'})}
        catch (error) {res.status(409).json({status:'error',message:error.message})}}

export const login=async(req,res)=>{
    const { username,password } = req.body
    try {     
        const client = await Client.findOne({ username })
        if (!client) {return res.status(401).json({status:'error',message:'username errato'})}
        else 
            {bcrypt.compare(password,client.password).then(function(result) {
            if (result) { 
                if (client.statoIscrizione=='1') {
                const maxAge=3*60*60 //3600 sec x 3
                const token = jwt.sign(
                { id: client._id, username:client.username },//jwt.sign genera un token applicato su id e username
                process.env.JWT_SECRET,
                { expiresIn: maxAge,}) // 3ore in sec
                console.log(token)
                res.cookie("jwt", token, {
                secure: true,
                httpOnly: true,
                maxAge: maxAge * 1000}) // 3ore in ms 
                res.status(201).json({user: client})}
            else {return res.status(401).json({status:'error',message:'devi completare iscrizione confermando la tua email'})}}
            else{res.status(401).json({status:'error',message:'password errata'})}
            })
            }
        }
    catch (error) {res.status(400).json({message: "An error occurred",error: error.message})}}

export const datiUser=async(req,res)=>{
    const {_id}=req.body
    try{
        const client = await Client.find({_id})
        res.status(201).json({user: client})}
    catch (err) {console.log(err.message)}
}
export const primoLogin=async(req,res)=>{
    const { username,password }=req.body 
    try {    
    const client = await Client.findOne({username})
    if (!client) {return res.status(401).json({status:'error',message:'username errato'})}
    if (await bcrypt.compare(password,client.password)) {
            await  Client.updateOne(
            {"username":username},
            {$set:{"statoIscrizione":'1'}})
            const maxAge=3*60*60 //3600 sec x 3
            const token = jwt.sign(
            { id: client._id, username:client.username },//jwt.sign genera un token applicato su id e username
            process.env.JWT_SECRET,
            { expiresIn: maxAge,}) // 3ore in sec
            console.log(token)
            res.cookie("jwt", token, {
            secure: true,
            httpOnly: true,
            maxAge: maxAge * 1000}) // 3ore in ms 
            res.status(201).json({user: client}) }
        else {return res.status(401).json({status:'error',message:'password errata'})}  
            }
        catch (error) {res.status(400).json({status:'error',message:error.message})}
    }  

export default routerAuth