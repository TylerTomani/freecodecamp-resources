import { sections } from "./letterFocus-sidebar-sections.js"
const subSections = document.querySelectorAll('.sub-sections')

function dropAutoFocusSubSection(){
    subSections.forEach(el => {
        if(el.classList.contains('show')){
            el.classList.add('drop')
        } else {            
        }
    })
}
dropAutoFocusSubSection()
function hideAllSubSections(){
    subSections.forEach(el => {
        if(el.classList.contains('show')){
            el.classList.remove('show')
        }
        if(el.classList.contains('drop')){
            el.classList.remove('drop')
        }
    })
}

sections.forEach(el => {
    el.addEventListener('click', e => {
        e.preventDefault()
        e.stopPropagation()
        const sectionsContainer = getSectionContainer(e.target.parentElement)
        const subSection = sectionsContainer.querySelector('.sub-sections')
        hideAllSubSections()
        subSection.classList.toggle('drop')
    })
    el.addEventListener('keydown', e => {
                let letter = e.key.toLowerCase() 
        const sectionsContainer = getSectionContainer(e.target.parentElement)
        const subSection = sectionsContainer.querySelector('.sub-sections')
        if(letter == 'enter' ){
            e.stopPropagation()
            hideAllSubSections()
            subSection.classList.toggle('drop')
        }
        
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