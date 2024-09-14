(function(){
    const canvas = document.querySelector('canvas')
    const c = canvas.getContext('2d')
    canvas.width = innerWidth
    canvas.height = innerHeight * .7
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)
    let clickedX, clickedY
    let lastKey = ''
    const keys = {
        down: {
            pressed: false
        },
        right: {
            pressed: false
        },
        up : {
            pressed : false
        },
        left : {
            pressed : false
        }
    }
    class Player{
        static width = 20
        constructor({position,velocity}){
            this.position = position
            this.velocity = velocity
            this.width = 20
        }
        draw(){
            c.fillStyle = 'orange'
            c.fillRect(this.position.x, this.position.y, this.width, this.width)
        }
        update(){
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y
            this.draw()
        }
    }
    const block = new Player({
        position : {
            x: 20,
            y: 20
        },
        velocity : {
            x: 0,
            y: 0
        }
    })
    
    addEventListener('keyup', e => {
        let key = e.keyCode
        switch(key){
            case 40:
                keys.down.pressed = false
                lastKey = 'down'
                break
            case 39:
                keys.right.pressed = false
                lastKey = 'right'
                break
            case 38:
                keys.up.pressed = false
                lastKey = 'up'
                break
            case 37:
                keys.left.pressed = false
                lastKey = 'left'
                break
        }
    })
    addEventListener('keydown', e => {
        let key = e.keyCode
        switch (key) {
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
    });
    addEventListener('pointerup', e => {
        keys.down.pressed = false
        keys.right.pressed = false
        keys.up.pressed = false
        keys.left.pressed = false
    })
    
    addEventListener('pointerdown', e => {
        const rect = canvas.getBoundingClientRect()
        clickedX = e.clientX - rect.left
        clickedY = e.clientY - rect.top
        if(clickedX > block.position.x
            && (clickedY <= (block.position.y + block.width * 2
            || clickedY <= block.position.y - block.width * 2))){
            block.velocity.x = block.width
            console.log('limit')
            lastKey = 'r'
        } 
        if(clickedY > block.position.y
            && (clickedY <= (block.position.y + block.width * 2
            || clickedY <= block.position.y - block.width * 2))){
            block.velocity.x = block.width
            console.log('limit')
            lastKey = 'r'
        } 
        
        // if(clickedX > block.position.x && clickedY > block.position.y
        //     && lastKey == 'r'){
        //     block.velocity.y = block.width
        //     lastKey = 'd'
        // }
        if(clickedX < block.position.x){
            lastKey = 'l'
        }
        if(clickedY < block.position.y){
            lastKey = 'u'
        }
        if(clickedY > block.position.y){
        }


    });
    function animate(){
        requestAnimationFrame(animate)
        c.fillStyle = 'white'
        c.fillRect(0, 0, canvas.width, canvas.height)
        block.update()
        
        if(keys.right.pressed){
            block.position.x += Player.width * .25
        } else
        if(keys.down.pressed){
            block.position.y += Player.width * .25
        } else
        if(keys.up.pressed){
            block.position.y -= Player.width * .25
        } else
        if(keys.left.pressed){
            block.position.x -= Player.width * .25
        }
         else {
            block.velocity.x = 0
            block.velocity.y = 0
        }
    }
    animate()

}())