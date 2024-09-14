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
            x: 200,
            y: 80
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
    
    function getMousePosition(event) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }
    function calculateAngle(mouseX, mouseY, blockX, blockY) {
        const dx = mouseX - blockX;
        const dy = mouseY - blockY;
        let angle = Math.atan2(dy, dx) * (180 / Math.PI); // Angle in degrees
    
        // Normalize angle to be between 0 and 360 degrees
        if (angle < 0) {
            angle += 360;
        }
        
        return angle;
    }
    
    addEventListener('pointerdown', e => {
        const mousePoint = getMousePosition(e);
        const blockCenterX = block.position.x + block.width / 2;
        const blockCenterY = block.position.y + block.width / 2;
        const angle = calculateAngle(mousePoint.x, mousePoint.y, blockCenterX, blockCenterY);
        console.log('Angle:', angle.toFixed(2), 'degrees');
        if(angle > 350 || angle < 45){
            block.velocity.x = block.width
        }
        if(angle > 45 && angle < 135){
            block.velocity.y = block.width
        }
        if(angle > 135 && angle < 270){
            block.velocity.x = (block.width * -1)
        }
        if(angle > 270 && angle < 350){
            block.velocity.y = (block.width * -1)
        }
    });
    function animate(){
        requestAnimationFrame(animate)
        c.fillStyle = 'white'
        c.fillRect(0, 0, canvas.width, canvas.height)
        block.update()
        
        if(keys.right.pressed){
            block.velocity.x = Player.width * .25
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