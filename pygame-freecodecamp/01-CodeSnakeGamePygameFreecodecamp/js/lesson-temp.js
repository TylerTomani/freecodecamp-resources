import { lastFocusedElement } from "./side-sections-temp.js"
import { getSubSection } from "./side-sections-temp.js"
import { sections } from "./side-sections-temp.js"
let iSection = 0
let currentSection
export function stepTxtListeners(){
const navbar = document.querySelector('.section-lesson-title')
const stepTxts = document.querySelectorAll('.step-txt')
const allImages = document.querySelectorAll(".step-img > img")
const allVideos = document.querySelectorAll(".step-vid > video")
const allStepTxtPAs = document.querySelectorAll('.step-txt > p > a')
const copyCodes = document.querySelectorAll('.step-txt > .code-container > .copy-code')
const nextLesson = document.getElementById('nxtLesson') ? document.getElementById('nxtLesson') : null
const targetDiv = document.getElementById('targetDiv')
    const keys = {
        meta: {
            pressed: false
        }
    }
let targetDivFocus = false
let playing = false
let videoCurrentPlay
// This has to be here for now because of going to last clicked section
    sections.forEach(el => {
        if(el.hasAttribute('autofocus')){
            iSection = [...sections].indexOf(el)
            currentSection = sections[iSection]
        }
        el.addEventListener('click', e => {
            e.preventDefault()
            iSection = [...sections].indexOf(e.target)
            currentSection = sections[iSection]
        })
        el.addEventListener('keydown', e => {
            let letter = e.key.toLowerCase()
            if (letter == 'enter') {
                iSection = [...sections].indexOf(e.target)
                currentSection = sections[iSection]
            }
        })
    })
targetDiv.addEventListener('focus', e => {targetDivFocus = true})
targetDiv.addEventListener('focusin', e => {targetDivFocus = true})
targetDiv.addEventListener('focusout', e => {
    targetDivFocus = false
    denlargeAllImages()    

})
targetDiv.addEventListener('keydown', e => {
    let letter = e.key.toLowerCase()
    if(letter == 'e'){
        if(nextLesson){
            nextLesson.focus()
        }
    }  
})
navbar.addEventListener('keydown',e =>{
    let letter = e.key.toLowerCase()
    if(letter == 'e'){
        if(nextLesson){
            nextLesson.focus()
        }   
    }
})
function getStep(parent) {
    if (parent.classList.contains('step') || parent.classList.contains('step-col')) {
        return parent
    } else if (parent.parentElement) {
        return getStep(parent.parentElement)
    } else {
        return null
    }
}
// copy code & a elements handling
function handleCopyCodes(e) {
    const step = getStep(e.target.parentElement)
    const copyCodes = step.querySelectorAll('.step-txt > .code-container > .copy-code')
    addTabIndex(copyCodes)
}
allStepTxtPAs.forEach(el => {
    el.addEventListener('focus', () => {
        denlargeAllImages()
        denlargeAllImages()
    })
    el.addEventListener('focusin', () => {
        denlargeAllImages()
    })
    el.addEventListener('click', e => {
        e.preventDefault()
        open(e.target.href, '_blank')
    })
})
function addTabIndex(els){
    els.forEach(el => {
        el.setAttribute('tabindex','0')
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
// image handling
allImages.forEach(el => {
    el.addEventListener('click', e => {
        toggleImgSize(e.target)
    })
})
function toggleImgSize(img) {
    if (img) {
        if (!img.classList.contains('enlarge')) {
            img.classList.add('enlarge')
            img.scrollIntoView({ behavior: "smooth", block: "end", inline: "end" });
        } else {
            img.classList.remove('enlarge')
        }
    }

}
/** Go BACK and ADD video denlarge here!!!! */
function denlargeAllImages() {
    if(!keys.meta.pressed){
        allImages.forEach(el => {
            if (el.classList.contains('enlarge')) {
                el.classList.remove('enlarge')
            }
        })
        allVideos.forEach(el => {
            if (el.classList.contains('enlarge-vid')) {
                el.classList.remove('enlarge-vid')
                // el.pause()
            }
        })
    }
}
stepTxts.forEach(el => {    
    el.addEventListener('focus', e => {
        removeAllTabIndex()
        denlargeAllImages()
        pauseAllVideos()
    })
    el.addEventListener('focusout', e => {
        denlargeAllImages()
    })
    el.addEventListener('click', e => {
        e.preventDefault()
        denlargeAllImages()
        toggleImgSize(e)
        // handleVideo(vid)
        // toggleVideoSizeKeydown(e)
        
    })
    el.addEventListener('keydown', e => {
        let key = e.keyCode
        let letter = e.key.toLowerCase()
        const stepTxt = e.target
        const as = stepTxt.querySelectorAll('a')
        const step = getStep(stepTxt.parentElement)
        const vid = step.querySelector('.step-vid > video')
        if (vid) {
            handleVideo(vid, key)
            handleVideoPlaying(vid, key, e)
        }
        if(key === 13){
            addTabIndex(as)
            handleCopyCodes(e)
            if(step){
                const img = step.querySelector('.step-img > img')
                toggleImgSize(img)
            }
        }
        if(letter == 'c'){
            const step = getStep(e.target.parentElement)
            const mainCode = step.querySelector('.main-code')
            if(mainCode){
                mainCode.focus()
            }
            
        }
        
    })    
})
// video handling
    addEventListener('click', e => {
        console.log(e.target)
    })
allVideos.forEach(el => {
    addEventListener('click', e => {
        let vid = e.target
        toggleVideoSize(vid)
        console.log(e.target)
    })
})
function handleVidClick(vid) {
    toggleVideoSize(vid)
}
function handleVideo(vid,key){
    if(key == 13){
        toggleVideoSize(vid)
        
    }
}
function toggleVideoSize(vid){
    if (!vid.classList.contains('enlarge-vid')) {
        vid.classList.add('enlarge-vid')
        vid.scrollIntoView({ behavior: "smooth", block: "end", inline: "end" });
        playing = true
        // console.log(key)
    } else {
        vid.classList.remove('enlarge-vid')
        playing = false
    }
}

function handleVideoPlaying(vid,key,e){
    if (key == 32) {
        e.preventDefault()
        playing = !playing
    }
    if (key == 37) {
        e.preventDefault()
        vid.currentTime -= 2
    }
    if (key == 39) {
        e.preventDefault()
        if (vid.currentTime < vid.duration) {
            vid.currentTime += 2
        } else {
            vid.pause()
        }
    }
    if (playing) {
        vid.play()
        vid.style.border = '1px solid green'
    } else {
        vid.style.border = '1px solid blue'
        vid.pause()
    }
    if (vid.currentTime == vid.duration) {
        vid.style.border = '2px solid red'
        playing = false
        // vid.pause()
        pauseAllVideos()
    }
}
function pauseAllVideos(){
    allVideos.forEach(el => {
        el.pause()
    })
}

// Numpad focus to invidiual steps txt focus
addEventListener('keyup', e => {
    let letter = e.key.toLowerCase()
    if(letter == 'meta'){
        keys.meta.pressed = true        
    }
})

addEventListener('keydown', e => {
    
    let letter = e.key.toLowerCase()
    let key = e.keyCode
    if(letter == 'meta'){
        keys.meta.pressed = true        
    }
        
    if(targetDivFocus){
        if(!isNaN(letter) && key != 32 ){
            let intLetter = parseInt(letter)
            if(intLetter > stepTxts.length){
                nextLesson.focus()
            } else {
                stepTxts[intLetter - 1].focus()
            }
        } else {
            if(letter == 'e'){
                if(nextLesson){
                    nextLesson.focus()
                } else {
                    stepTxts[stepTxts.length - 1 ].focus()
                }
            }        
        }
    } 
    
    
});
// The playing variable is asscoiated with img size so it is placed in here
if(nextLesson){
    nextLesson.addEventListener('focus', e => {
        removeAllTabIndex()
    })
    nextLesson.addEventListener('click', e => {
        const subSection = getSubSection(lastFocusedElement)
        
        if(subSection){
            const lessons = subSection.querySelectorAll('li > a')
            let iLesson = [...lessons].indexOf(lastFocusedElement) + 1
            if(lessons[iLesson]){
                lessons[iLesson].focus()
            } else {
                lastFocusedElement.focus()
            }
        } else {
            console.log(currentSection)
            if(sections[iSection + 1]){
                sections[iSection + 1].focus()
            } else {
                sections[0].focus()
            }
        }        
    })
    nextLesson.addEventListener('keydown', e => {
        let letter = e.key.toLowerCase()
        if(letter == 'a'){
            lastFocusedElement.focus()
        }
        if(letter == 'enter'){   
        }
    })
}
}
