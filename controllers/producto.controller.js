const status = require('http-status');
const config = require('../_config');
const handler = require('../utils/handler');
const http = require('http');
const async = require('async');
var qr = require('qr-image');
var fs = require('fs');
const path = require('path');
// var async = require('async');

let _producto;

const getAll = (req, res) => {
    const token = req.params.token;
    if(token=="1234"){
        _producto.find({})
        .sort({})
        .exec(handler.handleMany.bind(null, 'noticia', res));
    }else{
        res.status(400);
        res.json({error:"token incorrecto"});
    }
    
};

const getById = (req, res) => {
    const id=req.params.id;
    const token = req.params.token;
    console.log(id.toString().length)

    if(id.toString().length!=24){
        res.status(status.BAD_REQUEST);
        res.json({err:"identificador invalido"});
    }else{
        if(token=="1234"){
            _producto.find({_id:id})
        .sort({})
        .populate('noticia')
        .exec(handler.handleOne.bind(null, 'noticia', res));

        }else{
            /*aqui va lo del QR
             if(token=="1234"){
            _producto.find({_id:id})
        .sort({})
        .populate('noticia')
        .exec((error,doc)=>{
            if(error){
                res.status(400);

            }else{
                var code = qr.image(doc,{type:'png'});
       res.status(200),
       res.type('png');
       code.pipe(res);
            }
        });

        }else{
            res.status(400);
        res
            */
            res.status(400);
        res.json({error:"token incorrecto"});
        }
        
    }


    
};

const getCorreoPs=(req,res)=>{
    const password=req.params.password;
    const email=req.params.email;
    const token = req.params.token;
    console.log(email);
    console.log(password);
    if(token=="1234"){
        _producto.find({email:email})
        .sort({})
        .exec((error,doc)=>{
            console.log(error);
            console.log(doc);
            if(error){
                res.status(400);
                res.json({error:"consulta fallida"});
            }else if(doc.length==0){
                res.status(200);
                res.json({eror:"no tienes acceso"});
            }else{
                res.status(200);
                res.json({error:"si tiene acceso"});
            }
                
            
        });
    }else{
        res.status(400);
        res.json({error:"token incorrecto"});
    }
    
  
}

const deleteById = (req, res) => {
    const id=req.params.id;
    const token = req.params.token;
    console.log(id.toString().length)

    if(id.toString().length!=24){
        res.status(status.BAD_REQUEST);
        res.json({err:"identificador invalido"});
    }else{
        if(token=="1234"){
            _producto.remove({_id:id},(err,data)=>{
                if(err){
                    res.status(400);
                    res.json({msg:"no se pudo realizar la operacion"});
                }else{
                    res.status(200);
                    res.json({msg:"el usuario se elimino correctamente"});
                }
            });

        }else{
            res.status(400);
        res.json({error:"token incorrecto"});
        }
        
        
    }


    
};

const createUser = (req, res) => {
    const token = req.params.token;
   const user=req.body;
   if(token=="1234"){
    _producto.create(user).then((data)=>{
        res.status(200);
        res.json({msg:"usuario creado",data:data});
    }).catch((err)=>{
        res.status(400);
        res.json({msg:"algo va mal",data:err});
    })

   }else{
    res.status(400);
    res.json({error:"token incorrecto"});
   }
  
}

const updateById = (req, res) => {
    const id=req.params.id;
    const token = req.params.token;
    console.log(id.toString().length)
    const newData = req.body;

    const query = {_id:id};

    if(id.toString().length!=24){
        res.status(status.BAD_REQUEST);
        res.json({err:"identificador invalido"});
    }else{
        if(token=="1234"){
            _producto.findOneAndUpdate(query,newData,(err,data)=>{
                if(err){
                    res.status(400);
                    res.json({msg:"no se pudo realizar la operacion"});
                }else{
                    res.status(200);
                    res.json({msg:"el usuario se actualizo correctamente"});
                }
            });
            

        }else{
            res.status(400);
            res.json({error:"token incorrecto"});
        }
        
    }


    
};
module.exports = (Noticia) => {
    _producto = Noticia;
    return ({
        getAll,
        getById,
        getCorreoPs,
        deleteById,
        createUser,
        updateById
    });
}