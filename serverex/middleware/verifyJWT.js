const { decode } = require("jsonwebtoken");
const jwt   = require('jsonwebtoken');


const verifyJWT = (req, res, next) => {
       
        const bearerHeader = req.headers["authorization"];
                
                // console.log(bearerHeader);

                if(typeof bearerHeader !== 'undefined'){
                        const bearer 		= bearerHeader.split(" ");
                        const bearerToken 	= bearer[1];
                        req.token = bearerToken; 
                        next();
                }else{
                        res.json({
                                messageErrorToken: 'Token Not Found',
                                msg : req.headers['authorization']
                                
                        })
                }

        
}

module.exports = verifyJWT;