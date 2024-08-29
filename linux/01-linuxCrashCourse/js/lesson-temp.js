import { lastLink } from "./dropLoad.js"
import { getSectionContainer } from "./dropLoad.js"
export function stepTxtListeners(){
const targetDiv = document.getElementById('targetDiv')
const allStepTxtPAs = document.querySelectorAll('.step-txt > p > a')
const copyCodes = document.querySelectorAll('.step-txt > .code-container > .copy-code')
const stepTxts = document.querySelectorAll('.step-txt')
const stepTxtxArr = Array.from(stepTxts)
const allImages = document.querySelectorAll(".step-img > img")
const allVideos = document.querySelectorAll(".step-vid > video")
const nxtLesson = document.getElementById('nxtLesson')
let targetDivFocus = false
/* The playing variable is asscoiated with img size so it is placed in
the toggleImgSize() function */
let playing = false
// // // // // // // // // // 
let indexLesson = 0
nxtLesson.addEventListener('click', e => {
    const sectionContainer = getSectionContainer(lastLink)
    const lessons = sectionContainer.querySelectorAll('.sub-section > li > a')
    const lessonsArr = Array.from(lessons)
    let currrentIndex = lessonsArr.indexOf(lastLink)
    if(currrentIndex < lessonsArr.length -1){
        lessonsArr[currrentIndex + 1].focus()
    }else {
        lastLink.focus()
    }
})
targetDiv.addEventListener('focusin', e => {targetDivFocus = true})
targetDiv.addEventListener('focusout', e => {
    targetDivFocus = false
    denlargeAllImages()    
})
allStepTxtPAs.forEach(el =>{
    el.addEventListener('focus', () =>{
        denlargeAllImages()
    })
})
function handleCopyCodes(e){
    const step = getStep(e.target.parentElement)
    const copyCodes = step.querySelectorAll('.step-txt > .code-container > .copy-code')
    addTabIndex(copyCodes)
}
stepTxts.forEach(el => {
    el.addEventListener('click', e => {
        toggleImgSize(e)
        handleVideoKeydown(e)
    })
    el.addEventListener('focus', e => {
        pauseAllVideo()
        removeAllTabIndex()
    })
    el.addEventListener('focusout', e => {
        denlargeAllImages()
    })
    el.addEventListener('keydown', e => {
        let key = e.keyCode
        const stepTxt = e.target
        const as = stepTxt.querySelectorAll('a')
        handleVideoKeydown(e)
        if(key === 13){
            addTabIndex(as)
            handleCopyCodes(e)
            toggleImgSize(e)
            
        }
    })    
})
function toggleImgSize(e){
    e.preventDefault()
    
    const step = getStep(e.target)
    const img = step.querySelector('.step-img > img') ? step.querySelector('.step-img > img') : step.querySelector('.step-vid > video')
    if(!img.classList.contains('enlarge')){
        img.classList.add('enlarge')
        img.scrollIntoView({ behavior: "smooth", block: "end", inline: "end" });
    } else{
        img.classList.remove('enlarge')
    }
    
}
function getStep(parent){
    if(parent.classList.contains('step')){
        return parent
    } else if (parent.parentElement){
        return getStep(parent.parentElement)
    } else {
        return null
    }
}
function addTabIndex(els){
    els.forEach(el => {
        el.setAttribute('tabindex','1')
    })
}
function removeAllTabIndex(){
    allStepTxtPAs.forEach(el => {
        el.setAttribute('tabindex','-1')
    })
    copyCodes.forEach(el => {
        el.setAttribute('tabindex','-1')
    })
}

// Numpad focus to invidiual steps
addEventListener('keydown', e => {
    let letter = e.key.toLowerCase()
    let key = e.keyCode
    if(targetDivFocus){
        if(!isNaN(letter) && key != 32 ){
            let intLetter = parseInt(letter)
            if(intLetter > stepTxtxArr.length){
                nxtLesson.focus()
            } else {
                stepTxtxArr[intLetter - 1].focus()
            }
        } else {
            // return 
            
            if(letter == 'e'){
                nxtLesson.focus()
            }        
        }
    }
    
});

function handleVideoKeydown(e){
    let key = e.keyCode    
    const step = getStep(e.target.parentElement)
    const vid = step.querySelector('.step-vid > video')
    if(vid){        
        switch(key){
            case 32:
                e.preventDefault()
                if(playing){
                    vid.play() 
                    vid.style.border = "2px solid blue"
                } else if(!playing) {
                    vid.pause()
                    vid.style.border = "1px dotted red"
                }
                playing = !playing
                break;
            case 37:
                if(vid.currentTime > 0){
                    vid.currentTime = vid.currentTime - 1
                }
                if(vid.currentTime < vid.duration){
                    vid.style.border = '2px solid blue'
                }
                break
            case 39:
                vid.currentTime = vid.currentTime + 2
                if(vid.currentTime >= vid.duration  ){
                    // playing = false
                    vid.style.border = '14px solid red'
                    vid.pause()
                    vid.currentTime = vid.duration 
                } 
                break
            default:
                playing = !playing
            }    
            if(playing){
                vid.play() 
                vid.style.border = "2px solid blue"
            } else if(!playing) {
                vid.pause()
                vid.style.border = "1px dotted red"
            }
            
    }
}
// The playing variable is asscoiated with img size so it is placed in here

function denlargeAllImages(){
    allVideos.forEach(el => {
        if(el.classList.contains('enlarge')){
            el.classList.remove('enlarge')
            playing = false
            el.pause()
        }
    })
    allImages.forEach(el => {
        if(el.classList.contains('enlarge')){
            el.classList.remove('enlarge')
        }
    })
}
function pauseAllVideo(){
    allVideos.forEach(el => {
        
        el.pause()
    })
}
allVideos.forEach(el => {
    el.addEventListener('click', e =>{
        console.log(e.target)
        e.preventDefault()
        toggleImgSize(e)
        // const step =  getStep(e.target.parentElement)
        // const stepTxt = step.querySelector('.step-txt')
        handleVideoKeydown(e)



    })
})
allImages.forEach(el => {
    el.addEventListener('click',e => {
        console.log(e.target)
        // e.preventDefault()
        toggleImgSize(e)
        // denlargeAllImages()
    })
})
nxtLesson.addEventListener('focus', e => {
    removeAllTabIndex()
    pauseAllVideo()
})
}





