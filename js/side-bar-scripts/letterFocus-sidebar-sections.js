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
    if(letter != 's' || letter != 'a'){
        // console.log(letter)
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
    } 
    navSections(letter)
    if(letter == 's' ){
        console.log(letter)
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
sections.forEach(el => {
    el.addEventListener('focus', e => {
        // sectionClicked = false
        // lastFocusedElement = e.target
        // targetDivFocused = false
        // sectionsFocused = true
        // lessonsFocused = false
        iSection = [...sections].indexOf(e.target)
    })
    el.addEventListener('click', e => {
        e.preventDefault()
        e.stopPropagation()
        // toggleSubSections(e)
        // fetchLessonHref(e.target.href)
        sectionTitle.innerText = e.target.innerText
        lessonTitle.innerText = ''
        // currentSection = e.target
        
    })
    el.addEventListener('keydown', e => {
        let letter = e.key.toLowerCase()       
        if (letter == 's'){
            navSections(letter)
        }
        if (letter == 'a') {
            const sectionContainer = getSectionContainer(e.target)
            const subSection = sectionContainer.querySelector('.sub-section')
            const firstLesson = sectionContainer.querySelector('.sub-section > li a')
            if(firstLesson){
                if(subSection.classList.contains('hide')){
                    subSection.classList.remove('hide')
                }
                firstLesson.focus()
            }
        }
        if (letter == 'enter') {
            const sectionContainer = getSectionContainer(e.target.parentElement)
            const subSection = sectionContainer.querySelector('.sub-section')
            if(!subSection){
                // if (!subSection && sectionClicked) {
                //     targetDiv.focus()            
                //     scrollTo(0,0)
                // }
                // sectionClicked = !sectionClicked
            }
            // fetchLessonHref(e.target.href)
            scrollTo(0, 0)
        }
        if(letter == 'c'){
            // const mainCode = document.querySelector('#mainCode')
            targetDivFocused = true
        }        
        if(letter == 'j'){
            const sectionContainer = getSectionContainer(e.target)
            const lessons = sectionContainer.querySelectorAll('.sub-section > li > a')
            lessons.forEach(el => {
                el.classList.contains('js-canvas-lesson')
                el.focus()
            })
        }
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
lessons.forEach(el => {
    if (el.hasAttribute('autofocus')) {
        lessonsFocused = true
        currentLesson = el
    }
    el.addEventListener('focus', e => {
        currentLesson = ''
        lastFocusedElement = e.target
        sectionsFocused = false
        lessonsFocused = true
        targetDivFocused = false
    })
    el.addEventListener('click', e => {
        e.preventDefault()
        e.stopPropagation()
        lessonTitle = e.target.innerText
        

    })
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
        
        if (lessonsFocused) {
            navLessons(e, letter)
        }
        if(letter == 'c'){
            targetDivFocused = true
            
        }
        
    })
})

export function getSectionContainer(parent){
    if(parent.classList.contains('section-container')){
        return parent
    } else if (parent.parentElement){
        return getSectionContainer(parent.parentElement)
    } else {
        return null
    }
}