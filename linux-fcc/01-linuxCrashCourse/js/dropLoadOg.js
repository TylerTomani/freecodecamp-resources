import { aside } from "./main-letterFocus.js"
import { targetDiv } from "./main-letterFocus.js"
import { stepTxtListeners } from "./lesson-temp.js"
import { addCopyCodes } from "./copy-code.js"
const titleSectionEl = document.getElementById('section-title') 
const titleLessonEl = document.getElementById('lesson-title') 
const lessons = document.querySelectorAll('.sub-section > li > a')
const sections = document.querySelectorAll('.section')
const subSections = document.querySelectorAll('.sub-section')
const linksSections = document.querySelectorAll('.section-container a')
const sectionsArr = Array.from(sections)
export let lastLink
let currentLessons = []
let currentLessonNum
let switchLesson = false

let targetDivFocus = false
/**
    Switch sections to true, and lessons to false when not working on lessons  */ 
let focusedSections = true
let focusedLessons = false
let iSection = 0
let iLesson = 0
let clickedSection = false
let clickedLesson = false
subSections.forEach(el => {
    if(!el.classList.contains('show')){
        el.classList.add('hide')
    }
})
function hideSubSections(){
    subSections.forEach(el => {
        if(el.classList.contains('show')){
            el.classList.remove('show')
            el.classList.add('hide')
        } else el.classList.add('hide')
    })
}
sections.forEach(el => {
    el.addEventListener('click',e => {
        e.preventDefault()
        e.stopPropagation()
        toggleLessons(e)
    })
    el.addEventListener('focus', e =>{
        focusedSections = true
        focusedLessons = false
        targetDivFocus = false
    })
    el.addEventListener('focusout', e =>{
        clickedSection = false
    })
    el.addEventListener('keydown', e => {
        let key = e.keyCode
        lastLink = e.target
        if(key === 13 ){
            const sectionContainer = getSectionContainer(e.target)
            const subSection = sectionContainer.querySelector('.sub-section')
            // toggleLessons(e)
            // let hidden = true ? subSection.classList.contains('hide') : false
            // if(clickedSection   ){
            //     titleSectionEl.innerText = e.target.innerText
            // }
            // clickedSection = !clickedSection
        }
        
    })
})
lessons.forEach(el => {
    el.addEventListener('focus', e => {
        focusedSections = false
        focusedLessons = true
        clickedLesson = false
    })
    el.addEventListener('keydown', e => {
        const sectionContainer = getSectionContainer(e.target.parentElement)
        const lessons = sectionContainer.querySelectorAll('.sub-section > li > a')
        currentLessons = Array.from(lessons)
        let key = e.keyCode
        lastLink = e.target
        if(key === 13 ){
            if(clickedLesson){
                titleLessonEl.innerHTML = `&rarr; ${e.target.innerText}`
                targetDiv.focus()
            }
        }
        clickedLesson = !clickedLesson
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
function toggleLessons(e){
    const sectionContainer = getSectionContainer(e.target)
    const subSection = sectionContainer.querySelector('.sub-section')
    
    console.log(subSection)
    if(!subSection.classList.contains('hide')){
        subSection.classList.add('hide')   
    } else  {
        hideSubSections()
        subSection.classList.remove('hide')
    }
}
linksSections.forEach(el => {    
    el.addEventListener('click', e => {
        e.preventDefault()
        e.stopPropagation()
        const href = e.target.href
        loadContent(href)
    })
    
    el.addEventListener('focus', (e) => {
        lastLink = e.target
        clickedLesson = false
        clickedSection =false
        console.log()
    })
    if(el.hasAttribute('autofocus')){
        loadContent(el.href)
        
    }
})
aside.addEventListener('focusin', () => {
    if(lastLink){   
        lastLink.focus()
    }
    targetDivFocus = false
})
targetDiv.addEventListener('focus', () => {
    targetDivFocus = true
})

sectionsArr.forEach((el,i,arr) => {
    el.addEventListener('focus', e => {
        iSection = i
        iSection = (iSection + 1) % arr.length;
    })
})
addEventListener('keydown', e => {
    let letter = e.key.toLowerCase()
    if(focusedSections && !targetDivFocus){
        if(letter == 's'){
            sections[iSection].focus();
        }    
        if(!isNaN(letter)){
            let intLetter = parseInt(letter)
            if(intLetter >= 0){
                sectionsArr[intLetter - 1].focus()
            }
        }
    } else if(focusedLessons && !targetDivFocus){
        if(letter == 's'){
            e.preventDefault()
            let sectionContainer = getSectionContainer(e.target.parentElement)
            if(sectionContainer){
                let section = sectionContainer.querySelector('.section')
                section.focus()            
            }
        }
        if(!isNaN(letter)){
            let intLetter = parseInt(letter)
            console.log(intLetter)

            /** The following code is not scalable yet 
             *  
             *  It doesn't work past number 19, 
             * unable to get from 2, to 12, to 20 with 
             * the number 2
            */
            if(intLetter <= currentLessons.length){
                
                if(intLetter == currentLessonNum && currentLessons[currentLessonNum + 9]){
                    if(!switchLesson){
                        currentLessons[currentLessonNum + 9].focus()
                    } else {
                        currentLessons[currentLessonNum - 1].focus()
                    }
                    switchLesson = !switchLesson
                } else {
                    currentLessons[intLetter - 1].focus()
                }

            }
            currentLessonNum = intLetter
            
        }
    } 
    if(targetDivFocus){
        if(letter == 's'){lastLink.focus()}
        if(letter == 'a'){aside.focus()            }
    }
    if(letter == 'a'){
        if(aside.classList.contains('hide')){
            aside.classList.remove('hide')
        }   
    }  
})
targetDiv.addEventListener('focusin', e => {
    targetDivFocus = true
})
async function loadContent(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const content = await response.text();
            targetDiv.innerHTML = content;
            injectScripts(targetDiv);
        } else {
            targetDiv.innerHTML = '<p>Failed to load content.</p>';
        }
    } catch (error) {
        targetDiv.innerHTML = '<p>Error loading content.</p>';
    }
}
// Function to re-execute scripts in injected content
function injectScripts(container) {
    container.querySelectorAll('script').forEach(script => {
        const newScript = document.createElement('script');
        newScript.textContent = script.textContent;
        document.head.appendChild(newScript).parentNode.removeChild(newScript);
        /* This is key, attach the lesson script when inject html from lessons I don't get how the above
        code works before the variables, get a tutor to explain this */
        
        stepTxtListeners()
        addCopyCodes()
    });
}