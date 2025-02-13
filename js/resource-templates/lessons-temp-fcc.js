import { navTitles } from '../side-bar-scripts/toggle-sidebar.js'
import { mainContent } from '../side-bar-scripts/letterFocus-sidebar-sections.js'
export const aside = document.querySelector('aside')
export const header = document.querySelector('header')
import { sections } from '../side-bar-scripts/letterFocus-sidebar-sections.js'
import { keys } from '../side-bar-scripts/letterFocus-sidebar-sections.js'
// import { showAside } from './sections-fcc.js'
// import { toggleAside } from './sections-fcc.js'
import { lessons } from '../side-bar-scripts/letterFocus-sidebar-sections.js'
export let mainContentFocusIN = false
import { getSubSections } from '../side-bar-scripts/letterFocus-sidebar-sections.js'
import { lastClickedItem } from '../side-bar-scripts/letterFocus-sidebar-sections.js'
import { lastFocusedItem } from '../side-bar-scripts/letterFocus-sidebar-sections.js'
// import { lastFocusedSelection } from './sections-fcc.js'
function getStepContainer(parent) {
    if (parent.classList.contains('step')) {
        return parent
    } else if (parent.parentElement) {
        return getStepContainer(parent.parentElement)
    } else {
        return null
    }
}
function getStepColContainer(parent) {
    if (parent.classList.contains('step-col')) {
        return parent
    } else if (parent.parentElement) {
        return getStepColContainer(parent.parentElement)
    } else {
        return null
    }
}
function addTabs(el) { el.setAttribute('tabindex', '0') }
function removeTabs(el) { el.setAttribute('tabindex', '-1') }
export function stepTxtListeners(){
    let allImages,allVideos,steps,stepTxts,stepTxtsIns,nxtLesson,copyCodes,copyCodeSteps,codesStepTxtINs,pAs
    function declareConstantVariables(){
        allImages = document.querySelectorAll('.step-img > img') 
        allVideos = document.querySelectorAll('.step-vid > video') 
        steps = document.querySelectorAll('.step')
        stepTxts = document.querySelectorAll('.step-txt')
        stepTxtsIns = document.querySelectorAll('.step-txt-in')
        nxtLesson = document.getElementById('nxtLesson')
        copyCodes = document.querySelectorAll('.copy-code') 
        copyCodeSteps = document.querySelectorAll('.step > .step-txt > .code-container >  .copy-code') 
        codesStepTxtINs = document.querySelectorAll('.step-txt-in .copy-code ')
        pAs = document.querySelectorAll('p a') 
    }
    declareConstantVariables()
    let currentStep
    let colCodesFocused = false
    let currentStepIndex = 0
    let imgIndex = 0    
    sections.forEach(el => { el.addEventListener('focus', e => { mainContentFocusIN = false }) })
    lessons.forEach(el => { el.addEventListener('focus', e => { mainContentFocusIN = false }) })
    pAs.forEach(el => {
        el.setAttribute('tabindex','-1')
        el.addEventListener('focus', e => {
        })
    })    
    function removeInnerTabs() {
        codesStepTxtINs.forEach(el => {
            removeTabs(el)
        })
    }
    function removeOuterTabs() {
        copyCodeSteps.forEach(el => { el.setAttribute('tabindex', '-1') })
        // copyCodes.forEach(el => { el.setAttribute('tabindex','-1') })
        pAs.forEach(el => { el.setAttribute('tabindex', '-1') })
    }
    if(nxtLesson){
        nxtLesson.addEventListener('click', e => {
            
            const subSection = getSubSections(lastClickedItem)
            const lessons = subSection.querySelectorAll('li > a')
            let index
            if (subSection) {
                // showAside()
                if (!lastClickedItem) {
                    lastFocusedItem.focus()
                    scrollTo(0,0)
                } else if (lastClickedItem) {
                    let index = [...lessons].indexOf(lastClickedItem)
                    if(lessons[index + 1]){
                        lessons[index + 1].scrollIntoView()
                        console.log(lessons[index + 1])
                    } else {
                        // make this so it goes to next section
                        lastClickedItem.focus()
                        lastClickedItem.scrollIntoView()
                        
                    }
                }
                scrollTo(0,0)
            }
        })   
    }
    // This is overkill, target is set to _blank in html
    function openNewTab(e) {open(e.target.href, '_blank')}
    // this redundancy make it work, i think only focus out and keydown is needed but did overkill on this
    mainContent.addEventListener('focus', e => {mainContentFocusIN = true})
    mainContent.addEventListener('focusin', e => {mainContentFocusIN = true})
    mainContent.addEventListener('keydown', e => {mainContentFocusIN = true})
    mainContent.addEventListener('focusout', e => {
        mainContentFocusIN = false
        denlargeAllImages()

    })
    navTitles.addEventListener('keydown', e => {
        let letter = e.key.toLowerCase()
        if(letter != 'enter'){
            stepFocus(letter)
        }
        
    })
    function stepFocus(letter) {
        if(!isNaN(letter)){

            const intLetter = parseInt(letter)
            if (intLetter <= stepTxts.length) {
                denlargeAllImages()
                stepNumberFocus(intLetter)
            } else {
                if(nxtLesson){
                    nxtLesson.focus()
                }
            }
        }
    }
    function stepNumberFocus(intLetter) {
        stepTxts[intLetter - 1].focus()
    }
    // The code below handles img enlarge and code within step txt
    copyCodes.forEach(el => {
        el.addEventListener('focus', e => {
            denlargeAllImages()
            stopAllVideos()
        })
    })

    
    // This will handle img and video size enlarge and denlarge
    function handleImgSize(e) {
        const step = getStepContainer(e.target.parentElement)
        const stepCol = getStepColContainer(e.target.parentElement)
        if (step) {
            toggleStepImgSize(step)
        }
        if (stepCol) {
            toggleStepColImages(stepCol)
        }
    }
    function toggleStepColImages(stepCol) {
        const imgContainer = stepCol.querySelector('.img-container')
        const images = imgContainer.querySelectorAll('.step-img > img')           
        if(imgContainer){
            // let images = ['ss','ddd','ddd','eee']
                 denlargeAllImages()
            if(!keys.shift.pressed){

                
                imgIndex = (imgIndex + 1) % (images.length )
            } else if(keys.shift.pressed){

                // imgIndex = (imgIndex + images.length - 1) % images.length 
                imgIndex = (imgIndex - 1 + images.length) % images.length  
            }
            console.log(imgIndex)
        }
    }
    function toggleStepImgSize(step) {
        const stepImg = step.querySelector('.step-img')
        if(stepImg){
            const img = stepImg.querySelector('img')
            toggleImgSize(img)
        }
    }
    allImages.forEach(el => {
        el.addEventListener('click', e => {
            toggleImgSize(e.target)
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
        if(letter == 'shift'){
            keys.shift.pressed = true
        }
        
        if (mainContentFocusIN) {
            let letter = e.key.toLowerCase()
            if (!isNaN(letter)) {
                stepFocus(letter)

            }
            
            if (letter == 'e') {
                if(nxtLesson){

                    nxtLesson.focus()
                }
            }
            if (letter == 'a' || letter == 's') {
                // toggleStepColImages(stepCol)
                // showAside()
            }
            // const rect = stepTxts[currentStepIndex].getBoundingClientRect()
            // scrollTo(0, rect.y * .5)
            if(stepTxts.length > 0){
                stepTxts[currentStepIndex].scrollIntoView({block: 'center'})
            }
        }

        if (letter == 'e') {
            if(nxtLesson){

                nxtLesson.focus()
                nxtLesson.scrollIntoView()
            }
        }

    });
    
    stepTxts.forEach(el => {
        el.addEventListener('focus', e => {
            // removeOuterTabs()
            imgIndex = 0
            currentStepIndex = [...stepTxts].indexOf(e.target)
            stopAllVideos()
            // el.scrollIntoView()
        })
        el.addEventListener('keydown', e => {
            let letter = e.key.toLowerCase()
            if (letter == 'enter') {
                removeOuterTabs()
                removeInnerTabs()
                handleImgSize(e)
                handleStepTabIndex(e)
                videoHandle(e)
            }
            if(letter == 'a' ){
                if(lastClickedItem){
                    lastClickedItem.focus()
                }
                
            }
            if(letter == 'c'){
                const stepColContainer = getStepColContainer(e.target.parentElement)
                if(stepColContainer){
                    removeInnerTabs()
                    removeOuterTabs()
                    const copyCodeINFirst = stepColContainer.querySelector('.step-col-in .copy-code')
                    const copyCodeINs = stepColContainer.querySelectorAll('.step-col-in .copy-code')
                    if(copyCodeINFirst){

                        copyCodeINFirst.focus()
                    }
                    copyCodeINs.forEach(el => {
                        addTabs(el)
                    })
                } else {
                    removeInnerTabs()
                    removeOuterTabs()
                    const step = getStepContainer(e.target.parentElement)
                    const copyCodeFirst = step.querySelector('.step-txt .copy-code')
                    const copyCodes = step.querySelectorAll('.step-txt > .copy-code')
                    copyCodeFirst.focus()
                    copyCodes.forEach(el => {addTabs(el)})

                }
            }
            if (letter == 'tab') {
                denlargeAllImages()
            }
            
        })
    })
    function handleStepTabIndex(e) {
        const stepCol = getStepColContainer(e.target.parentElement)
        if(stepCol){

            const copyCodes = e.target.querySelectorAll('.copy-code')
            
            const as = e.target.querySelectorAll('p a')
            const copyCodesIns = stepCol.querySelectorAll('.step-col-in > .step-txt-in .copy-code')
            copyCodesIns.forEach(el => {    
                addTabs(el)
            })
            copyCodes.forEach(el => {
                addTabs(el)
            })
            as.forEach(el => addTabs(el))
            
        }
    }    
    codesStepTxtINs.forEach(el => {
        el.addEventListener('click', e => {
            const stepCol = getStepColContainer(e.target.parentElement)
            
        })
        el.addEventListener('keydown', e => {
            let letter = e.key.toLowerCase()
            if(letter == 'c'){
                removeInnerTabs()               
            }
            if(letter == 'enter'){
                const stepCol = getStepColContainer(e.target.parentElement)
                const img = stepCol.querySelector('.step > .step-img > img')
                toggleImgSize(img)
            }
            
        })
    })
    function toggleImgSize(img) {
        img.style.zIndex = "1"
        if(!img.classList.contains('enlarge')){
            img.classList.add('enlarge')
        } else {
            img.classList.remove('enlarge')
        }
       
    }   
    function videoHandle(e){
        const step = getStepContainer(e.target.parentElement)
        if(step){

            const vid = step.querySelector('.step-vid > video')
            if(vid){
                toggleVid(vid)
            }
        }
    }
    function toggleVid(vid){
        if(vid){

            if (vid.paused) {
                vid.play()
                vid.classList.add('enlarge')
            } else {
                vid.play()
                vid.classList.add('enlarge')
            }
        }
    }
    function stopAllVideos(){
        allVideos.forEach(el => {
            el.pause()
            if(el.classList.contains('enlarge')){
                el.classList.remove('enlarge')
            }
        })
    }
    function denlargeAllImages() {
        allImages.forEach(el => {
            // el.style.zIndex = "0"
            if (el.classList.contains('enlarge')) {
                el.classList.remove('enlarge')
            }
            if (el.classList.contains('enlarged-sm')) {
                el.classList.remove('enlarged-sm')
            }
            if (el.classList.contains('enlarged-md')) {
                el.classList.remove('enlarged-md')
            }
            if (el.classList.contains('enlarge-col-l')) {
                el.classList.remove('enlarge-col-l')
            }
            if (el.classList.contains('enlarge-col-r')) {
                el.classList.remove('enlarge-col-r')
            }
            if (el.classList.contains('enlarged-lg')) {
                el.classList.remove('enlarged-lg')
            }
            if (el.classList.contains('enlarge-col-img')) {
                el.classList.remove('enlarge-col-img')
            }
        })
    }    
    
}