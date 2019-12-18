import Logger from "../helpers/Logger";

function errorLogger(){
    return (err,req,res,next)=>{
        Logger.error(err);
        next(err)
    }
}

function errorsHandler(){
    return(err,req,res,next)=>{
        console.log('handling error');
        console.log(err)
        if(err.statusCode){
            return res.sendStatus(err.statusCode);
        }
        res.sendStatus(500);
        next();
    }
}
//error handling middleware should be defined after all other middlewares/routes
export {
    errorLogger,
    errorsHandler
}
