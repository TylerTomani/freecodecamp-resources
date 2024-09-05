(function(){
    const canvas = document.querySelector('canvas')
    const c = canvas.getContext('2d')
    let xBlock = 10
    let yBlock = 10
    let heightWidth = 20
    const block = new Image();
    block.src = './js/canvas-js-scripts/img/block.jpg';
    const keys = {
        down :{
            pressed: false
        },
        up :{
            pressed: false
        },
        right :{
            pressed: false
        },
        left :{
            pressed: false
        },
        
    }
    function animate(){
        requestAnimationFrame(animate)
        c.fillStyle = 'rgb(255,255,255)'
        // c.fillRect(0,0,canvas.width,canvas.height)
        c.drawImage(block, xBlock, yBlock, heightWidth, heightWidth)
        if(keys.down.pressed){
            yBlock += heightWidth * .1
        }
        if(keys.right.pressed){
            xBlock += heightWidth * .1
        }
        if(keys.up.pressed){
            yBlock -= heightWidth * .1
        }
        if(keys.left.pressed){
            xBlock -= heightWidth * .1
        }



        

    }
    animate()
    addEventListener('keyup', e => {
        let key = e.keyCode
        switch(key){
            case 40:
                keys.down.pressed = false
                break
            case 39:
                keys.right.pressed = false
                break
            case 38:
                keys.up.pressed = false
                break
            case 37:
                keys.left.pressed = false
                break
        }
    })
    addEventListener('keydown', e => {
        let key = e.keyCode
        console.log(key)
        switch(key){
            case 40:
                e.preventDefault()
                keys.down.pressed = true
                break
            case 39:
                e.preventDefault()
                keys.right.pressed = true
                break
            case 38:
                e.preventDefault()
                keys.up.pressed = true
                break
            case 37:
                e.preventDefault()
                keys.left.pressed = true
                break
        }
    })
}())