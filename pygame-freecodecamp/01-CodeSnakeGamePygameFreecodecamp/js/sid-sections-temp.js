const header = document.querySelector('header')
const backlink = document.getElementById('backlink')
const homelink = document.getElementById('homelink')
const tutorialLink = document.getElementById('tutorialLink')
const regexCmdsLink = document.getElementById('regexCmds')
const programShorcutsLink = document.getElementById('programShorcuts')
const navBar = document.querySelector('.section-lesson-title')
const allEls = document.querySelectorAll('body *')
const mainAside = document.querySelector('main > aside')
const sections = document.querySelectorAll('.section')
const lessons = document.querySelectorAll('.sub-section > li > a')
let iSection = 0
let sectionsFocused = true
let lessonsFocused = false
let started = false
const keys = {
    shift :{
        pressed: false
    }
}
sections.forEach(el => {
    el.addEventListener('focus', e =>{
        sectionsFocused = true
        lessonsFocused = false
        if(!keys.shift.pressed){
            iSection = [...sections].indexOf(el)

        }
    })
    el.addEventListener('click', e =>{
        e.preventDefault()
        e.stopPropagation()
    })
})
lessons.forEach(el => {
    el.addEventListener('focus', e =>{
        sectionsFocused = false
        lessonsFocused = true
    })
    el.addEventListener('click', e => {
        e.preventDefault()
        e.stopPropagation()
    })
})
addEventListener('keyup', e => {
    let letter = e.key.toLowerCase()
    if(letter == 'shift'){
        keys.shift.pressed = false
    }
})
addEventListener('keydown', e => {
    let letter = e.key.toLowerCase()
    started = true
    // console.log(iSection)
    
    if(letter == 'shift'){
        keys.shift.pressed = true
        
    }
    console.log(keys.shift.pressed)
    
    if(!lessonsFocused){
        if(letter == 's'){
            navSections(e,letter)
        }
        
    }
});
function navSections(e,letter){
    console.log(iSection)
    if(!keys.shift.pressed){
        sections[iSection].focus()
        iSection = (iSection  + 1) % sections.length
    } else {
        iSection = (iSection - 1 + sections.length ) % sections.length;            

    }
    sections[iSection].focus()
    
}
function mainFocusElements(letter){

}