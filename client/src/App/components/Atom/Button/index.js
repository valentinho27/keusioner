import React from 'react';

const Button = ({title, isLoading}) => {

    if(isLoading === true){
        return (
            <button disabled={true} className="btn btn-primary shadow-2 mb-4">loading...</button>
    
        )    
    }
    return (
        <button className="btn btn-primary shadow-2 mb-4">{title}</button>

    )
}

export default Button;