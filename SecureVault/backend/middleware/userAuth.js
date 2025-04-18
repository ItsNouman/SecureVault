import jwt from 'jsonwebtoken';

const userAuth= async(req,res,next)=>{
    const {token}=req.cookies;
    if(!token){
        return res.json({success:'false',message:'not authorized, login again'});
    }
    try{
        const tokenDecode=jwt.verify(token,process.env.JWT_SECRET);
        if(tokenDecode.id){
            req.body.userId=tokenDecode.id
        }
        else{
            return res.json({success:'false',message:'not authorized, login again'});
        }

        next();
    }
    catch(err){
        return res.status(500).json({success:'false',message:'server error'});
    }
}

export default userAuth;