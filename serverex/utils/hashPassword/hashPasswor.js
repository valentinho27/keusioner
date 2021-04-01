var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {

        const hash = bcrypt.hashSync(password, salt);
        return hash;

}

const checkHashPassword = (pass, dbpass) => {
        
        const cekPass =  bcrypt.compareSync(pass, dbpass);
        return cekPass;
}


module.exports = { hashPassword, checkHashPassword };