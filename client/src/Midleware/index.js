
const dataUser = JSON.parse(sessionStorage.getItem('UserId'));

    if(dataUser.Login === true){
        
    }else{
        const history = useHistory();
        return history.push('/auth/masuk');
    }

console.log();