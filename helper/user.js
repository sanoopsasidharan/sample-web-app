var db = require('../config/connection');
var objectId = require('mongodb').ObjectId
module.exports = {
     
    signup : (reqbody)=>{

        
        return new Promise(async(resolve,reject)=>{

            db.get().collection('newuser').findOne(reqbody).then((data)=>{
                if(data=== null){
                    db.get().collection('newuser').insertOne(reqbody).then((outdata)=>{
                        resolve()
                    })
                }else{
                    resolve(data)
                    console.log('user all ready signup');
                }
            })           
        })
    },
    // login 

    Login :(data)=>{
        console.log(data);
        return new Promise(async(resolve,reject)=>{

            // finding user
            let user=await db.get().collection('newuser').findOne(data);
            
            if(user){
                
                if(user.isactive){
                   
                    
                  
                    resolve(user);
                }else{ 
                    
                  
                    reject(user)
                    console.log('o2');
                    // resolve(null);
                }
            }else{
                // reject(user)
                resolve(null);
            }
        })
    },
    adminLogin :(reqBody)=>{
        return new Promise ((resolve,reject)=>{
            db.get().collection('admin').findOne(reqBody).then((outdata)=>{
                resolve(outdata)
            })
        })
    },
    getAllCollecions:()=>{
        return new Promise(async (resolve,reject)=>{
            var collections = await db.get().collection('newuser').find().toArray()
            resolve(collections) 
        })
    },
    addUser:(data)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection('newuser').insertOne(data).then((data)=>{
                resolve()
            })
        })
    },
    deleteUser:(userId)=>{
        return new Promise ((resolve,reject)=>{
            db.get().collection('newuser').deleteOne({_id:objectId(userId)}).then((response)=>{
                resolve(response);
            })
        })
    },
    getusersDetails:((userId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection('newuser').findOne({_id:objectId(userId)}).then((user)=>{
                resolve(user)
            })

        })
    }),
    updateuser:((userId,userdetails)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection('newuser').updateOne({_id:objectId(userId)},{
                $set:{
                    name:userdetails.name,
                    email:userdetails.email,
                    number:userdetails.number

                }
            }).then((response)=>{
                resolve()
            })
        })
    }),
    searchuser:((reqbody)=>{
        var names = reqbody.name;
        return new Promise(async (resolve,reject)=>{
           var resp = await db.get().collection('newuser').find({name:{$regex:names}}).toArray()
                resolve(resp)
        })
    }),
    blockuser:((userId)=>{
        return new Promise((resolve,reject)=>{
            console.log(userId);
            db.get().collection('newuser').updateOne({_id:objectId(userId)},{$set:{isactive:false}}).then((ee)=>{
                resolve(ee);
            })
        })
    }),
    unblockuser:((userId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection('newuser').updateOne({_id:objectId(userId)},{$set:{isactive:true}}).then((ee)=>{
                resolve(ee);
            })
        })
    })






    // showCollections :()=>{
    //     return new Promise ((resolve,reject)=>{
    //         db.get().collection('newuser').find().then((outdata)=>{
    //             resolve(outdata)
    //         })
    //     })
    // },
    
}