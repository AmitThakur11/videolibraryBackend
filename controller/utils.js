const getResponse = (res, status , msg ,userData)=>{
    if(status === 200){
        return res.status(status).json({
                success : true,
                msg ,
                userData
            })
        }
    

    if(status === 400){
        return res.status(status).json({
                success : false ,
                msg : msg
            })
        }
    
    if(status === 500){
        return res.status(status).json({
                success : false ,
                msg : msg
            })
        }
    
    if(status === 401){
        return res.status(status).json({
                success : false ,
                msg : msg
            })
        }
    
}

module.exports = getResponse