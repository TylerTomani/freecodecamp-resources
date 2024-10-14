
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

    sections.forEach(el => { el.addEventListener('focus', e => { mainContentFocusIN = false }) })
    lessons.forEach(el => { el.addEventListener('focus', e => { mainContentFocusIN = false }) })
    pAs.forEach(el => {
        el.setAttribute('tabindex','-1')
        el.addEventListener('focus', e => {
        })
    })
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
    
}