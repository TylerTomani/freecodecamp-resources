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
let currentLetter
let letterIds = []
let iLetterIds = 0
let iSection = 0
let iLesson = 0
let lastFocusedItem 
let sectionsFocused = true
let lessonsFocused = false
const backLink = document.querySelector('#backlink')
const homeLink = document.querySelector('#homelink')
const regexCmds = document.querySelector('#regexCmds')
const programShortcuts = document.querySelector('#programShortcuts')
const tutorialLink = document.querySelector('#tutorialLink')
const keys = {
    shift : {
        pressed: false
    }
}
function mainElementsFocus(letter){
    switch(letter){
        case 'b':
            backLink.focus()
            break
        case 'h':
            homeLink.focus()
            break
        case 'm':
            mainContent.focus()
            break
        case 'n':
            navTitles.focus()
            break
        case 'p':
            programShortcuts.focus()
            break
        case 'r':
            regexCmds.focus()
            break
        case 't':
            tutorialLink.focus()
            break
    }
}
header.addEventListener('focus', e => {
    sectionsFocused = true
    lessonsFocused = false
})
header.addEventListener('keydown', e => {
    let letter = e.key.toLowerCase() 
    iSection -= 1
    navSections(letter)  
})
addEventListener('keyup',e =>{
    let letter = e.key.toLowerCase() 
    if(letter == 'shift' ){
        keys.shift.pressed = false
        
    }
})
addEventListener('keydown',e =>{
    let letter = e.key.toLowerCase() 
    mainElementsFocus(letter)
    if(letter == 'shift' ){
        keys.shift.pressed = true
        
    }
    if(sectionsFocused){
        navSections(letter)
    }
})
function navSections(letter){
    if( letter == 's'){
        if (!keys.shift.pressed) {
            iSection = (iSection + 1) % sections.length
            
        } else if (keys.shift.pressed ) {
            if (iSection > 0) {
                iSection -= 1
            } else if (iSection <= 0) {
                iSection = sections.length - 1
            }   
        }
        sections[iSection].focus()
    }
}
sections.forEach(el =>{
    el.addEventListener('focus', e => {
        sectionsFocused = true
        lessonsFocused = false
        // iSection = [...sections].indexOf(e.target)
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
export function getSubSections(parent){
    if(parent.classList.contains('sub-sections')){
        return parent
    } else if (parent.parentElement){
        return getSectionContainer(parent.parentElement)
    } else {
        return null
    }
}