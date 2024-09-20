
import {header,nav, targetDiv, targetDivFocusIN} from "./lessons-temp-fcc.js"
import { stepTxtListeners } from "./lessons-temp-fcc.js"
import { addCopyCodes } from "./copy-code-resources.js"
let sTitle = document.querySelector('#section-title')
let lTitle = document.querySelector('#lesson-title')
const aside = document.querySelector('aside')
const backlink = document.querySelector('#backlink')
const homelink = document.querySelector('#homelink')
const regexCmds = document.querySelector('#regexCmds')
const programShortcuts = document.querySelector('#programShortcuts')
const tutorialLink = document.querySelector('#tutorialLink')

export const lessons = document.querySelectorAll('.sub-section > li > a')
export const sections = document.querySelectorAll('.section')
let sectionsFocused = true
let lessonsFocused = false
let targetDivFocus = false
let pageStarted = false
let iSection = 0
let iLesson = 0
export let lastFocusedSelection
export let currentClickedSelection
const keys = {
    shift: {
        pressed: false
    }
}

function hideSubSections(){
    sections.forEach(el => {
        const sectionContainer = getSectionContainer(el.parentElement)
        const subSection = sectionContainer.querySelector('.sub-section')
        if(subSection){
            if(!subSection.classList.contains('show')){
                subSection.classList.add('hide')
            } 
        }
    })
}
function toggleSubSection(e){
    const sectionContainer = getSectionContainer(e.target.parentElement)
    const subSection = sectionContainer.querySelector('.sub-section')
    if(subSection){
        // I just can't figure out how to do basic fucking things anymore
        // Why won't subSectino with class show hide
        if(subSection.classList.contains('show')){
            subSection.classList.remove('show')
            subSection.classList.add('hide')
        } 
        if(!subSection.classList.contains('hide')){
            subSection.classList.add('hide')
            
        } else {
            hideSubSections()
            subSection.classList.remove('hide')  
        }
     
    }
}
hideSubSections()
header.addEventListener('focus', e => {
    sectionsFocused = true
})
targetDiv.addEventListener('focus', e => {
    targetDivFocus = true
})
targetDiv.addEventListener('keydown', e => {
    let letter = e.key.toLowerCase() 
    if(letter == 'a' ){
        if(currentClickedSelection){
            // currentClickedSelection.focus()
        }
        
    }  
})
header.addEventListener('keydown', e => {
    let letter = e.key.toLowerCase()
    
    if(!lastFocusedSelection && letter == 's'){
        showAside()
        sections[0].focus()
    } else if (lastFocusedSelection && letter == 's') {
        showAside()
        lastFocusedSelection.focus()
    }

    handleSectionsFocus(letter = letter)
    
})
export function showAside(){
    if(aside.classList.contains('hide')){
        aside.classList.remove('hide')
    }

}
export function toggleAside(){
    if(aside.classList.contains('hide')){
        aside.classList.remove('hide')
    } else {
        aside.classList.add('hide')
        
    }

}
targetDiv.addEventListener('keydown', e => {
    let letter = e.key.toLowerCase()
    if(!lastFocusedSelection && letter == 's'){
        sections[0].focus()
    } else if (lastFocusedSelection && letter == 's') {
        lastFocusedSelection.focus()
        // scrollTo(0, 0)
    }
    // if(!currentClickedSelection && letter == 'a'){
    //     lastFocusedSelection.focus()
    // }
})
nav.addEventListener('keydown', e => {
    let letter = e.key.toLowerCase()
    if(letter == 's'){
        if(aside.classList.contains('hide')){
            aside.classList.remove('hide')
        }
        scrollTo(0, 0)
        if(!lastFocusedSelection ){
            sections[0].focus()
            
        } else if(lastFocusedSelection ){
            lastFocusedSelection.focus()
        }
    }
    if(letter == 'a'){
        if(aside.classList.contains('hide')){
            aside.classList.remove('hide')
        }
        if(!currentClickedSelection ){
            lastFocusedSelection.focus()
        } else if (currentClickedSelection ){
            currentClickedSelection.focus()
        }
    }
    if(letter == 'enter'){
        aside.classList.toggle('hide')
        // if (!currentClickedSelection) {
        //     lastFocusedSelection.focus()
        // } else if (currentClickedSelection) {
        //     currentClickedSelection.focus()
        // }
    }
})
header.addEventListener('keydown', pageElementsFocus)
nav.addEventListener('click', (e)=>{
    e.preventDefault()
    aside.classList.toggle('hide')
})

addEventListener('keyup', e => {
    let letter = e.key.toLowerCase()
    if (letter == 'shift') {
        keys.shift.pressed = false
    }
})

function handleLessonsFocus(e,letter){
    if (letter === 'tab') {
        return; /* default Tab behavior work naturally Very important, lessons were not working,
         this makes the tab key work, Not Sure where this is breaking out to.
        */
    }
    const sectionContainaer = getSectionContainer(e.target.parentElement)
    const section = sectionContainaer.querySelector('.section') 
    const lessons = sectionContainaer.querySelectorAll('.sub-section > li > a')
    if(letter == 'a' && !keys.shift.pressed){   
        iLesson = (iLesson + 1) % lessons.length
        lessons[iLesson].focus()
    } else if(letter == 'a' && keys.shift.pressed){
        iLesson = (iLesson + lessons.length -1 ) % lessons.length
        lessons[iLesson].focus()

    }
    if(letter == 's'){   
        section.focus()
    }
    if(!isNaN(letter)){
        const intLetter = parseInt(letter)
        if(intLetter <= lessons.length){

            lessons[intLetter - 1].focus()
        }
    }
}
// handle shift key up
sections.forEach(el => {
    if (el.hasAttribute('autofocus')) {
        fetchLessonHref(el.href)
        sectionsFocused = true
    }
    el.addEventListener('focus', e => {
        sectionsFocused = true
        lessonsFocused = false
        iSection = [...sections].indexOf(el)
        lastFocusedSelection = el
    })
    el.addEventListener('click', e => {
        e.preventDefault()
        e.stopPropagation()
        hideSubSections()
        toggleSubSection(e)
        fetchLessonHref(e.target.href)
        if(e.target.classList.contains('show')){
            e.target.classList.remove('show')
            
        }
    })
    el.addEventListener('keydown', e => {
        let letter = e.key.toLowerCase()
        if(sectionsFocused){
            handleSectionsFocus(e,letter)
        } else {
            return
        }
        if(letter == 'enter'){
            e.preventDefault()
            
            
            hideSubSections()
            toggleSubSection(e) 
            fetchLessonHref(e.target.href)           
            sTitle.innerText = e.target.innerText.slice(0,9) + ' - '
            
        }
        if(letter == 'c'){
            const codeMain = document.querySelector('.code-main')
            if (codeMain){
                codeMain.focus()
            }
        }
        
        
    })
})
lessons.forEach(el => {
    if(el.hasAttribute('autofocus')){
        fetchLessonHref(el.href)
        lessonsFocused = true
        currentClickedSelection = el
    }
    el.addEventListener('focus', e => {
        sectionsFocused = false
        lessonsFocused = true
        lastFocusedSelection = e.target

    })
    el.addEventListener('click', e => {
        e.preventDefault()
        e.stopPropagation()
        fetchLessonHref(e.target.href)
    })
    el.addEventListener('keydown', e => {
        let letter = e.key.toLowerCase()
        if (lessonsFocused) {
            handleLessonsFocus(e, letter)
        }
        if (letter == 'enter') {
            fetchLessonHref(e.target.href)
            if (e.target == currentClickedSelection) {
                targetDiv.focus()
            }
            const sectionContainer = getSectionContainer(e.target.parentElement)
            const section = sectionContainer.querySelector('.section')
            sTitle.innerText = section.innerText.slice(0, 9) + ' - '
            lTitle.innerText = '0'+e.target.innerText
            currentClickedSelection = e.target
            
        }
    })
})
function handleSectionsFocus(e,letter) {
    if(!isNaN(letter)){
        const intLetter = parseInt(letter)
        if(intLetter <= sections.length){
            sections[intLetter - 1 ].focus()
        }
    } 
    if (letter == 'a') {
        const sectionContainaer = getSectionContainer(e.target)
        const subSection = sectionContainaer.querySelector('.sub-section')
        if(!subSection.classList.contains('hide')){
            const lesson = subSection.querySelector('li > a')
            lesson.focus()
        }else {

            console.log('nno')
        }

    }
    if (letter == 's') {
        if (!keys.shift.pressed) {
            iSection = (iSection + 1) % sections.length
        } else if (keys.shift.pressed) {
            iSection = (iSection - 1 + sections.length) % sections.length;            
        }
        sections[iSection].focus()
    }
}
function pageElementsFocus(letter){
    switch(letter){
        case 'b':
            backlink.focus()
            break
        case 'c':
                const codeMain = document.querySelector('.code-main')
                if (codeMain) {
                    codeMain.focus()
                }
            break
        case 'h':
            homelink.focus()
            break
        case 'r':
            regexCmds.focus()
            break
        case 'p':
            programShortcuts.focus()
            break
        case 't':
            tutorialLink.focus()
            break
        case 'm':
            targetDiv.focus()
            break
        case 'n':
            nav.focus()
            break
    }
    // scrollTo(0,0)
}
addEventListener('keydown', e => {
    let letter = e.key.toLowerCase()
    if (letter === 'tab') {
        return; /* default Tab behavior work naturally Very important, lessons were not working,
         this makes the tab key work, Not Sure where this is breaking out to.
        */
    }
    if (letter == 'shift') {
        keys.shift.pressed = true
    }
    if(letter == 'enter'){
        // if(aside.classList.contains('hide')){
        //     aside.classList.remove('hide')
        // }
    }
    if (!pageStarted && letter == 's') {
        // sections[0].focus()
        // pageStarted = true
    } else if(letter == 's'){

        if (!lastFocusedSelection) {
            sections[0].focus()
        } 
        else if (lastFocusedSelection) {
            lastFocusedSelection.focus()
        }
    }
    // if(letter == 'a'){
    //     if(currentClickedSelection){
    //         currentClickedSelection.focus()
    //     } else {
    //         lastFocusedSelection.focus()
    //     }   
    // }
    pageElementsFocus(letter)
});
function getSectionContainer(parent){
    if(parent.classList.contains('section-container')){
        return parent
    } else if (parent.parentElement){
        return getSectionContainer(parent.parentElement)
    } else {
        return null
    }
}
export function getSubSection(parent){
    if(parent.classList.contains('sub-section')){
        return parent
    } else if (parent.parentElement){
        return getSubSection(parent.parentElement)
    } else {
        return null
    }
}
function fetchLessonHref(href) {
    fetch(href)
        .then(response => response.text())
        .then(html => {
            // Inject the retrieved HTML into the target div
            targetDiv.innerHTML = html;
            ////////////// This function is located in lesson-temp.js ////////////////////////////////////////////////////////////////////////////////////
            stepTxtListeners()
            addCopyCodes()
        })
        .catch(error => console.log('Error fetching content.html:', error));
}

