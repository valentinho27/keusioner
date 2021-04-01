import React from 'react';


const randVal =  () => {
    const argumen = ['avatar-1', 'avatar-2', 'avatar-3', 'avatar-4', 'avatar-5'];
    var x = Math.floor(Math.random() * argumen.length);
    return argumen[x];
}

export default randVal;
