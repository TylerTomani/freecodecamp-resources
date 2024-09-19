export const nav = document.querySelector('nav.section-lesson-title')
export const targetDiv  = document.querySelector('#targetDiv')
export const aside = document.querySelector('aside')
export const header = document.querySelector('header')
import { sections } from './sections-fcc.js'
import { showAside } from './sections-fcc.js'
import { toggleAside } from './sections-fcc.js'
import { lessons } from './sections-fcc.js'
export let targetDivFocusIN = false
import { getSubSection } from './sections-fcc.js'
// import { currentClickedSelection } from './sections-fcc.js'
// import { lastFocusedSelection } from './sections-fcc.js'
addEventListener('DOMContentLoaded', e => {
    if (innerWidth < 501) {
        // aside.classList.add('hide')
        targetDivFocusIN = true
    } else {
        // aside.classList.remove('hide')
    }
})
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
export function stepTxtListeners(){
    const allImages = document.querySelectorAll('.step-img > img') 
    const allVideos = document.querySelectorAll('.step-vid > video') 
    const steps = document.querySelectorAll('.step')
    const stepTxts = document.querySelectorAll('.step-txt')
    const stepTxtsIns = document.querySelectorAll('.step-txt-in')
    const nxtLesson = document.getElementById('nxtLesson')
    const copyCodes = document.querySelectorAll('.copy-code') 
    const copyCodeSteps = document.querySelectorAll('.step > .step-txt > .code-container >  .copy-code') 
    const codesStepTxtINs = document.querySelectorAll('.step-txt-in .copy-code ')
    let currentStep
    const pAs = document.querySelectorAll('p a') 
    let colCodesFocused = false
    let currentStepIndex = 0
    let imgIndex = 0
    addEventListener('resize', e => {
        if (innerWidth < 501) {
            // aside.classList.add('hide')
            targetDivFocusIN = true
        } else{
            // aside.classList.remove('hide')
        }
    })
    
    sections.forEach(el => { el.addEventListener('focus', e => { targetDivFocusIN = false }) })
    lessons.forEach(el => { el.addEventListener('focus', e => { targetDivFocusIN = false }) })
    pAs.forEach(el => {
        el.setAttribute('tabindex','-1')
        el.addEventListener('focus', e => {
        })
    })
    
    if(nxtLesson){
        nxtLesson.addEventListener('click', e => {
            const subSection = getSubSection(currentClickedSelection)
            const lessons = subSection.querySelectorAll('li > a')
            let index
            if (subSection) {
                showAside()
                if (!currentClickedSelection) {
                    lastFocusedSelection.focus()
                } else if (currentClickedSelection) {
                    let index = [...lessons].indexOf(currentClickedSelection)
                    if(lessons[index + 1]){
                        lessons[index + 1].scrollIntoView()
                    } else {
                        // make this so it goes to next section
                        currentClickedSelection.focus()
                        currentClickedSelection.scrollIntoView()
                        
                    }
                }
                scrollTo(0,0)
            }
        })   
    }
    // This is overkill, target is set to _blank in html
    function openNewTab(e) {open(e.target.href, '_blank')}
    // this redundancy make it work, i think only focus out and keydown is needed but did overkill on this
    targetDiv.addEventListener('focus', e => {targetDivFocusIN = true})
    targetDiv.addEventListener('focusin', e => {targetDivFocusIN = true})
    targetDiv.addEventListener('keydown', e => {targetDivFocusIN = true})
    targetDiv.addEventListener('focusout', e => {
        targetDivFocusIN = false
        denlargeAllImages()

    })
    nav.addEventListener('keydown', e => {
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
        })
    }    
    function addTabs(el) {el.setAttribute('tabindex', '0')}
    function removeTabs(el) {el.setAttribute('tabindex','-1')}
    function removeInnerTabs() {
        codesStepTxtINs.forEach(el => {
            removeTabs(el)
        })
    }
    function removeOuterTabs() {
        copyCodeSteps.forEach(el => { el.setAttribute('tabindex','-1') })
        // copyCodes.forEach(el => { el.setAttribute('tabindex','-1') })
        pAs.forEach(el => { el.setAttribute('tabindex','-1') })
    }
    

    
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
        if(imgContainer){

            const images = imgContainer.querySelectorAll('.step-img > img')
            
            const img = images[imgIndex]
            // imgIndex = (imgIndex +  )
            denlargeAllImages()
            if(imgIndex == 0){
                img.classList.add('enlarge-col-l')
                img.style.zIndex = '5'
            }
            if(imgIndex == 1){
                img.classList.add('enlarge-col-r')
                img.style.zIndex = '5'
            }
            
            else {
                stepCol.focus()
                // stepCol.scrollIntoView()
            }
            imgIndex = (imgIndex + 1) % (images.length + 1)
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
    addEventListener('keydown', e => {
        let letter = e.key.toLowerCase()
        if (targetDivFocusIN) {
            let letter = e.key.toLowerCase()
            if (!isNaN(letter)) {
                stepFocus(letter)

            }
            
            if (letter == 'e') {
                nxtLesson.focus()
            }
            if (letter == 'a' || letter == 's') {
                // toggleStepColImages(stepCol)
                showAside()
            }
            // const rect = stepTxts[currentStepIndex].getBoundingClientRect()
            // scrollTo(0, rect.y * .5)
            if(stepTxts.length > 0){
                stepTxts[currentStepIndex].scrollIntoView({block: 'center'})
            }
        }

        if (letter == 'e') {

            nxtLesson.focus()
            nxtLesson.scrollIntoView()
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
            if(letter == 'c'){
                const stepColContainer = getStepColContainer(e.target.parentElement)
                if(stepColContainer){
                    removeInnerTabs()
                    removeOuterTabs()
                    const copyCodeINFirst = stepColContainer.querySelector('.step-col-in .copy-code')
                    const copyCodeINs = stepColContainer.querySelectorAll('.step-col-in .copy-code')
                    copyCodeINFirst.focus()
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
        const vid = step.querySelector('.step-vid > video')
        if(vid){
            toggleVid(vid)
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
}