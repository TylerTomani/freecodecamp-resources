import { navTitles } from "./toggle-sidebar.js"
import { sideBarBtn } from "./toggle-sidebar.js"
import { sideBar } from "./toggle-sidebar.js"
const idEls = document.querySelectorAll('[id]')
export const parts = document.querySelectorAll('.side-bar ul > li > a')
const sections = document.querySelectorAll('.section')
const lessons = document.querySelectorAll('.sub-section > li > a')
const sectionTitle = document.querySelector('.section-title')
const lessonTitle  = document.querySelector('.lesson-title')
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
    if(letter == 's' || letter == 'shift' ){
        navSections(letter)
    }
    currentLetter = letter
    // console.log(letterIds)
    // console.log(focusedSideBar)
})
sideBar.addEventListener('focusin' , e => {
    focusedSideBar = true
    // console.log('in')
})
sideBar.addEventListener('focusout' , e => {
    focusedSideBar = false
    // console.log('out')

})
function navSections(letter) {
    
    // if (keys.shift.pressed && letter == 's') {
    //     iSection = (iSection + sections.length - 1) % sections.length
    //     sections[iSection].focus()
    // }else
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
    console.log(iSection)
    try {
        // Attempting to parse invalid JSON
    } catch (error) {
        // Handle the error if it occurs
        console.error("To slow:", error.message);
    } finally {
        // Code that runs regardless of the error
        // console.log("Execution complete");
    }
     
}
sections.forEach(el => {
    el.addEventListener('focus',e  => {
        iSection = [...sections].indexOf(e.target)
    })
})
function navLessons(e, letter) {
    const sectionContainer = getSectionContainer(e.target.parentElement)
    if (sectionContainer) {
        const section = sectionContainer.querySelector('.section')
        const subSection = getSubSection(e.target.parentElement)
        const lessons = subSection.querySelectorAll('li > a')
        if (subSection) {
            if (letter == 's') {
                section.focus()
            }
            if (!isNaN(letter)) {
                let intLetter = parseInt(letter)
                if (intLetter <= lessons.length && intLetter >= 0) {
                    lastFocusedElement = lessons[intLetter - 1]
                    lastFocusedElement.focus()
                }
            }
            if(letter == 'a'){
                iLesson = (iLesson + 1) % lessons.length
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