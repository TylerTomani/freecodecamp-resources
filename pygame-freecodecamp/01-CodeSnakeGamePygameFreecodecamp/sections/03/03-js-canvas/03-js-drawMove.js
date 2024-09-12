(function(){
    const canvas = document.querySelector('canvas')
    const c = canvas.getContext('2d')
    canvas.width = innerWidth
    canvas.height = innerHeight * .7
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)
    let lastKey = ''
    let playerSpeed = .1
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
    });
    function animate(){
        requestAnimationFrame(animate)
        c.fillStyle = 'white'
        c.fillRect(0, 0, canvas.width, canvas.height)
        block.update()
        
        if(keys.right.pressed){
            block.velocity.x += playerSpeed
        } else
        if(keys.down.pressed){
            block.velocity.y += playerSpeed
        } else
        if(keys.up.pressed){
            block.velocity.y -= playerSpeed
        } else
        if(keys.left.pressed){
            block.velocity.x -= playerSpeed
        }
         else {
            block.velocity.x = 0
            block.velocity.y = 0
        }
    }
    animate()

}())