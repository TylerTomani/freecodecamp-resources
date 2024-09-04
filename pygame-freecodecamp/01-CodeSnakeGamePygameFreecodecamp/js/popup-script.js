(function(){
    // I need to figure strict out
    // 'use strict' 
    const keys = {
        shift : {
            pressed : false
        }
    }
    addEventListener('keyup', e =>{
        keys.shift.pressed = true
    })
    addEventListener('keydown', e =>{
        let letter = e.key.toLowerCase()
        if(letter == 'shift'){
            keys.shift.pressed  true
        }
        
    })

}())