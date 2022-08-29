const JWT =require ("jsonwebtoken");

module.exports=function(req,res,next){
    const token =req.header("auth-token");
    if(!token)return res.status(401).send("access-denied");
    try{
        const verified =JWT.verify(token,"aaaaa");
        req.user= verified;
        next();
    }catch(err){
        res.status(400).sned("invalid token");

    }
    };