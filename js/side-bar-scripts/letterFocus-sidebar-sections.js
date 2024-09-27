import { sideBarBtn } from "./toggle-sidebar.js"
import { sideBar } from "./toggle-sidebar.js"
const idEls = document.querySelectorAll('[id]')
export const parts = document.querySelectorAll('.side-bar ul > li > a')
const sections = document.querySelectorAll('.section')
const lessons = document.querySelectorAll('.sub-section > li > a')

let focusedSideBar = false
let currentLetter
let letterIds = []
let iLetterIds = 0
let iSection = 0
const keys = {
    shift : {
        pressed: false
    }
}
addEventListener('keyup', e => {
    let letter = e.key.toLowerCase() 
    if(letter == 'shift' ){
        keys.shift.pressed = false        
    }
})
addEventListener('keydown', e => {
    let letter = e.key.toLowerCase() 
    if(letter == 'shift' ){
        keys.shift.pressed = true
    }
    if(!focusedSideBar){    
        if(letter != currentLetter){
            letterIds = []
            idEls.forEach(el => {
                if(el.id[0] == letter){
                    letterIds.push(el)
                }
            })
            if(letterIds.length > 0){
                letterIds[0].focus()
            }
        } 
    console.log(letterIds)
    
        if(letter == currentLetter && keys.shift.pressed){
            if(letterIds.length > 0){
                iLetterIds = (iLetterIds - 1 + letterIds.length) % letterIds.length
                letterIds[iLetterIds].focus()
            }
        }    else
        if(letter == currentLetter && !keys.shift.pressed){
            if(letterIds.length > 0){
                iLetterIds = (iLetterIds + 1) % letterIds.length
                letterIds[iLetterIds].focus()
            }
        }     
    }

    if(letter == 's' ){
        // navSections(letter)
    }
    currentLetter = letter
})
sideBar.addEventListener('focusin' , e => {
    focusedSideBar = true
    console.log('in')
})
sideBar.addEventListener('focusout' , e => {

})



function navSections(letter) {
    if (!keys.shift.pressed && letter == 's' ) {
        iSection = (iSection + 1) % sections.length

    } else if (keys.shift.pressed && letter == 's') {
        if (iSection > 0) {
            iSection -= 1
        } else if (iSection <= 0) {
            iSection = sections.length - 1
        }
    }
    sections[iSection].focus()
}