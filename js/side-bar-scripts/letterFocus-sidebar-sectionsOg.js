import { navTitles } from "./toggle-sidebar.js"
import { sideBarBtn } from "./toggle-sidebar.js"
import { sideBar } from "./toggle-sidebar.js"
const header = document.querySelector('body > header')
const mainContent = document.querySelector('#mainContent')
const idEls = document.querySelectorAll('[id]')
export const parts = document.querySelectorAll('.side-bar ul > li > a')
export const sections = document.querySelectorAll('.section')
export const lessons = document.querySelectorAll('.sub-sections > li > a')
const sectionTitle = document.querySelector('.section-title')
const lessonTitle  = document.querySelector('.lesson-title')
let focusedSideBar = false
let currentLetter
let letterIds = []
let iLetterIds = 0
let iSection = 0
let iLesson = 0
let lastFocusedItem 
let sectionsFocused = false
const keys = {
    shift : {
        pressed: false
    }
}
function focusToSections(){
    if(lastFocusedItem){
        lastFocusedItem.focus()
    } else {
        sections[0].focus()
    }
}
/** Why don't this work */
// [header,navTitles,mainContent].forEach(el => {
//     el.addEventListener('keydown',e => {
//         let letter = e.key.toLowerCase() 
//         if(letter == 's' ){
//              focusToSections()
//         }
//     })
// })
header.addEventListener('keydown',e => {
    let letter = e.key.toLowerCase() 
    if(letter == 's' ){
        focusToSections()
    }
})
navTitles.addEventListener('keydown',e => {
    let letter = e.key.toLowerCase() 
    if(letter == 's' ){
        focusToSections()
    }
})
mainContent.addEventListener('keydown',e => {
    let letter = e.key.toLowerCase() 
    if(letter == 's' ){
        focusToSections()
    }
})
sideBarBtn.addEventListener('keydown',e => {
    let letter = e.key.toLowerCase() 
    if(letter == 's' ){
        focusToSections()
    }
})
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
    if(letter == 's' || letter == 'shift' ){
        // navSections(letter)
    } else {
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
        currentLetter = letter
    }
})
sideBar.addEventListener('focusin' , e => {
    focusedSideBar = true
})
sideBar.addEventListener('focusout' , e => {
    focusedSideBar = false

})
function navSections(letter,lessons) {
    if (!keys.shift.pressed && letter == 's' ) {
        iSection = (iSection + 1) % sections.length

    } else if (keys.shift.pressed && letter == 's') {        
        if (iSection > 0) {
            iSection -= 1
        } else if (iSection <= 0) {
            iSection = sections.length - 1
        }
        /** I can't get this working  */
        // iSection = (iSection + sections.length - 1) % sections.length
    }

    if(!isNaN(letter)){
        let intLetter = parseInt(letter)
        lessons[intLetter - 1].focus()
    }
    sections[iSection].focus()
     
     
}
sections.forEach(el => {
    el.addEventListener('focus',e  => {
        sectionsFocused = true

        iSection = [...sections].indexOf(e.target)
        lastFocusedItem = e.target
    })
    el.addEventListener('keydown', e => {
        let letter = e.key.toLowerCase() 
        if(letter == 's' || letter == 'shift' || !isNaN(letter)){
            const sectionContainer = getSectionContainer(e.target.parentElement)
            const subSections = sectionContainer.querySelector('.sub-sections')
            const lessons = subSections.querySelectorAll('li > a')
            navSections(letter,lessons)
        }
        if (letter == 'a' ) {       
            const sectionContainer = getSectionContainer(e.target.parentElement)
            const subSections = sectionContainer.querySelector('.sub-sections')
            const firstLesson = subSections.querySelector('li a')
            if(firstLesson){
                if(subSections.classList.contains('hide')){
                    subSections.classList.remove('hide')
                }
                firstLesson.focus()
            }
        }
    })
    
})
lessons.forEach(el => {
    el.addEventListener('keydown', e => {
        let letter = e.key.toLowerCase()
        const subSection = getSectionContainer(e.target)
        const section = subSection.querySelector('.section')
        if (letter == 's') {
            section.focus()
        }
        
        if(letter == 'enter'){
            sectionTitle.innerText = section.innerText
            lessonTitle.innerText = e.target.innerText
            
        }       
        navLessons(e, letter)
    })
})
function navLessons(e, letter) {
    const sectionContainer = getSectionContainer(e.target.parentElement)
    if (sectionContainer) {
        const section = sectionContainer.querySelector('.section')
        const subSection = sectionContainer.querySelector('.sub-sections')
        const lessons = subSection.querySelectorAll('li > a')
        if (subSection) {
            if (letter == 's') {
                section.focus()
            }
            if (!isNaN(letter)) {
                let intLetter = parseInt(letter)
                if (intLetter <= lessons.length && intLetter >= 0) {
                    lastFocusedItem = lessons[intLetter - 1]
                    lastFocusedItem.focus()
                }
            }
            if(letter == 'a' && !keys.shift.pressed){
                iLesson = (iLesson + 1) % lessons.length
                // lessons.forEach(el => {
                //     console.log(el)
                // })
                // console.log(lessons[iLesson])
                lessons[iLesson].focus()
            }
        }
    }
}
export function getSectionContainer(parent){
    if(parent.classList.contains('section-container')){
        return parent
    } else if (parent.parentElement){
        return getSectionContainer(parent.parentElement)
    } else {
        return null
    }
}
export function getSubSections(parent){
    if(parent.classList.contains('sub-sections')){
        return parent
    } else if (parent.parentElement){
        return getSectionContainer(parent.parentElement)
    } else {
        return null
    }
}