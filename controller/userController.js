import User from "../models/user.js";
import bcrypt from "bcrypt"

export function rejisterUser(req,res){
   
    const data = req.body;
    data.password = bcrypt.hashSync(data.password,10)
    const  newUSer = new User(data)
    newUSer.save().then(()=>{

        res.json(
            {
                message :" user rejistration successfully"
            }
        )
    }).catch((error)=>{
        res.status(500).json({
            error :" USer rejistraion faild"
        })
    })
}

export function userLogin(req,res){
    
}