const customMiddleware = (req, res, next)=>{
    let verified = true;
    if(verified){
        next()
    }
    res.send("You are not verified")
}

module.exports = customMiddleware;