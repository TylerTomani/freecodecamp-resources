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
sections.forEach(el => {
    el.addEventListener('focus', e =>{
        sectionsFocused = true
        lessonsFocused = false
        iSection = [...sections].indexOf(el)
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
addEventListener('keydown', e => {
    let letter = e.key.toLowerCase()
    started = true
    console.log(iSection)
    if(!lessonsFocused){
        if(letter == 's'){
            navSections(e,letter)
        }
        
    }
});
function navSections(e,letter){
    sections[iSection].focus()
    iSection = (iSection  + 1) % sections.length
    
}
function mainFocusElements(letter){

}