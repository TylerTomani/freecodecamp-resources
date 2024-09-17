(function(){
   const canvas = document.querySelector('canvas')
   const c = canvas.getContext('2d')
   canvas.width = innerWidth
   canvas.height = innerHeight * .7
   c.fillStyle = 'white'
   c.fillRect(0, 0, canvas.width, canvas.height)
  
  
  
   
   // Keys set to true when clicked initially then immediately to false
   const keys = {
       down: false,
       right: false,
       up: false,
       left: false
   }
  
  
  
   class Player {
   static width = 20
   constructor({ position }) {
       this.position = position
       this.width = 20
   }
   draw() {
       c.fillStyle = 'orange'
       c.fillRect(this.position.x, this.position.y, this.width, this.width)
   }
   update() {
       this.draw()
   }
  } 
      
  const block = new Player({
   position: {
       x: 200,
       y: 80
   }
  })
  
  
  
   // Key Pressing
  canvas.addEventListener('keyup', e => {
   const key = e.keyCode
   switch(key){
    case 40: // Down arrow
     keys.down = false
     break
    case 39: // Right arrow
     keys.right = false
     break
    case 38: // Up arrow
     keys.up = false
     break
    case 37: // Left arrow
     keys.left = false
     break
  }
  })
  
  canvas.addEventListener('keydown', e => {
   const key = e.keyCode
   switch (key) {
    case 40: // Down arrow
     e.preventDefault()
     keys.down = true
     break
    case 39: // Right arrow
     e.preventDefault()
     keys.right = true
     break
    case 38: // Up arrow
     e.preventDefault()
     keys.up = true
     break
    case 37: // Left arrow
     e.preventDefault()
     keys.left = true
     break
  }
  })
  
  
  
  // Mouse Click Control
  addEventListener('pointerup', e => {
  //Nice Code
   Object.keys(keys).forEach(key => keys[key] = false)
  })
  function getMousePosition(event) {
   const rect = canvas.getBoundingClientRect()
   return {
     x: event.clientX - rect.left,
     y: event.clientY - rect.top
   }
  }
  function calculateAngle(mouseX, mouseY, blockX, blockY) {
   const dx = mouseX - blockX
   const dy = mouseY - blockY
   let angle = Math.atan2(dy, dx) * (180 / Math.PI) // Angle in degrees
   
   if (angle < 0) {
    angle += 360
   }
  
   return angle
  }
  
  canvas.addEventListener('pointerdown', e => {
      const mousePoint = getMousePosition(e)
      // For some reason the block.positions are off from mousePoint
      const blockCenterX = block.position.x + block.width -40
      const blockCenterY = block.position.y + block.width -40
      console.clear()
      // console.log('blockx',blockCenterX,'blocky',blockCenterY)
      // console.log('mouseX',mousePoint.x,'mouseY',mousePoint.y)
      const angle = calculateAngle(mousePoint.x, mousePoint.y, blockCenterX, blockCenterY)
      console.log(angle)
      if (angle > 315 || angle < 45) {
          keys.right = true
      } else if (angle > 215 && angle < 315) {
          keys.up = true
      } else if (angle > 135 && angle < 215) {
          keys.left = true
      } else if (angle > 45 && angle < 135) {
          keys.down = true
      }
  })
      function animate() {
          requestAnimationFrame(animate)
          c.fillStyle = 'white'
          c.fillRect(0, 0, canvas.width, canvas.height)
          block.update()
          // Move block based on key presses
          
          if (keys.right) {
              block.position.x += block.width
              keys.right = false // Ensure it moves only once per press
          }
          if (keys.down) {
              block.position.y += block.width
              keys.down = false // Ensure it moves only once per press
          }
          if (keys.up) {
              block.position.y -= block.width
              keys.up = false // Ensure it moves only once per press
          }
          if (keys.left) {
              block.position.x -= block.width
              keys.left = false // Ensure it moves only once per press
          }
      }
      animate()
  }())
  