const navBar = document.querySelector('.section-lesson-title')
const allEls = document.querySelectorAll('body *')
const mainAside = document.querySelector('main > aside')
const sections = document.querySelectorAll('.section')
const lessons = document.querySelectorAll('.sub-section > li > a')
let sectionsFocused = true
let lessonsFocused = false
sections.forEach(el => {
    el.addEventListener('focus', e =>{
        sectionsFocused = true
        lessonsFocused = false
    })
})
lessons.forEach(el => {
    el.addEventListener('focus', e =>{
        sectionsFocused = false
        lessonsFocused = true
    })
})
addEventListener('keydown', e => {
    if(!lessonsFocused){
        
    }
});