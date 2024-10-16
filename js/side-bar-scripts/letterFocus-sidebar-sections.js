import { navTitles } from "./toggle-sidebar.js"
import { sideBarBtn } from "./toggle-sidebar.js"
import { sideBar } from "./toggle-sidebar.js"
import { stepTxtListeners } from "../resource-templates/lessons-temp-fcc.js"
let mainContentHasFocus = false
const header = document.querySelector('body > header')
export const mainContent = document.querySelector('#mainContent')
const idEls = document.querySelectorAll('[id]')
export const parts = document.querySelectorAll('.side-bar ul > li > a')
export const sections = document.querySelectorAll('.section')
export const lessons = document.querySelectorAll('.sub-sections > li > a')
const sectionTitle = document.querySelector('.section-title')
const lessonTitle  = document.querySelector('.lesson-title')
let currentLetter
let letterIds = []
let iLetterIds = 0
let iSection = -1
let iLesson = 0
export let lastFocusedItem
export let lastClickedItem
export let lastClickedLesson
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
mainContent.addEventListener('focus', e => {
    sectionsFocused = false
    lessonsFocused = false
    mainContentHasFocus = true
})
mainContent.addEventListener('keydown', e => {
    let letter = e.key.toLowerCase()
    if(letter == 'a'){
        console.log(lastClickedLesson)
    }
})
header.addEventListener('focus', e => {
    sectionsFocused = true
    lessonsFocused = false
})
header.addEventListener('keydown', e => {
    let letter = e.key.toLowerCase() 
    if(letter == 's'){
        if(lastFocusedItem){
            lastFocusedItem.focus()
        }
    }
    if(letter == 'a'){
        if(lastClickedLesson){
            // lastClickedLesson.focus()
        }
    }
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
    if(letter == 's' || letter == 'a'){
        if(lastFocusedItem){
            lastFocusedItem.focus()
        } else {
            sections[0].focus()
        }

    }
    if(letter == 'a'){
        if(lastClickedLesson){
            // lastClickedLesson.focus()
        }
    }
    if(sectionsFocused ){
        if(!isNaN(letter)){
            let intLetter      = parseInt(letter)
            sections[intLetter - 1].focus()
        }
    }
})
// Initialize iSection to -1 so it starts before the first element
function navSections(letter) {
    if (letter === 's') {
        if (keys.shift.pressed) {
            // If shift is pressed, decrement iSection
            iSection = (iSection - 1 + sections.length) % sections.length;
        } else {
            // Increment iSection, starting from -1 to 0 on first press
            iSection = (iSection + 1) % sections.length;
        }
        // Focus on the new section, making sure to focus sections[0] on the first "S" press
        sections[iSection].focus();
    }
}

sections.forEach(el =>{
    if(el.hasAttribute('autofocus')){
        injectPage(el.href)
    }
    el.addEventListener('focus', e => {
        sectionsFocused = true
        lessonsFocused = false
        mainContentHasFocus = false
        iSection = [...sections].indexOf(e.target)
        lastFocusedItem = e.target
    })
    el.addEventListener('click', e => {
        e.preventDefault()
        e.stopPropagation()
        injectPage(e.target.href)
     })
    el.addEventListener('keydown', e => {
        let letter = e.key.toLowerCase() 
        if(letter == 's'){
            navSections(letter)
        }
        if(letter == 'a'){
            if(lastClickedLesson){
                lastClickedLesson.focus()
            } 
            const sectionContainer = getSectionContainer(e.target.parentElement)
            const lessons = sectionContainer.querySelectorAll('.sub-sections > li a')
            lessons[0].focus()
            sectionsFocused = false
            lessonsFocused = true
        }
        
    })
})
lessons.forEach(el =>{
    if(el.hasAttribute('autofocus')){
        injectPage(el.href)
    }
    el.addEventListener('focus', e => {
        sectionsFocused = false
        lessonsFocused = true
        mainContentHasFocus = false
        const sectionContainer = getSectionContainer(e.target.parentElement)
        const lessons = sectionContainer.querySelectorAll('.sub-sections > li a')
        iLesson = [...lessons].indexOf(e.target)
        lastFocusedItem = e.target
    })
    el.addEventListener('click', e => {

        e.preventDefault()
        e.stopPropagation()
        if(e.target.hasAttribute('tabindex')){
            injectPage(e.target.href)
        } else {
            clickChildren(e.target)
        }
        lastClickedLesson = e.target
     })
    el.addEventListener('keydown', e => {
        let letter = e.key.toLowerCase() 
        const sectionContainer = getSectionContainer(e.target.parentElement)
        const lessons = sectionContainer.querySelectorAll('.sub-sections > li a')
        if(letter == 'enter' ){
            if(e.target == lastClickedItem){
                mainContent.focus()
            }
            lastClickedItem = e.target
            
        }
        if(letter == 's'){
            const sectionContainer = getSectionContainer(e.target.parentElement)
            const section = sectionContainer.querySelector('.section')
            section.focus()
        }
        if(letter == 'a' ){
            console.log(iLesson)
            navLessons(letter,lessons)
        }
        if(!isNaN(letter)){
                let intLetter  = parseInt(letter)
                lessons[intLetter - 1].focus()
        }
    })
})
function clickChildren(target){
    // const childs = target.querySelector
    console.log(target)
    injectPage(target.parentElement.href)
}
function navLessons(letter,lessons) {
    if (letter == 'a') {
        if (keys.shift.pressed) {
            // If shift is pressed, decrement iSection
            iLesson = (iLesson - 1 + lessons.length) % lessons.length;
        } else {
            // Increment iLesson, starting from -1 to 0 on first press
            iLesson = (iLesson + 1) % lessons.length;
        }
        // Focus on the new section, making sure to focus sections[0] on the first "S" press
        lessons[iLesson].focus();
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

function injectPage(href){
    fetch(href)
    .then(response => response.text())
    .then(html => {
        mainContent.innerHTML = html
        stepTxtListeners()
    })
}