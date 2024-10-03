import { sections } from "./letterFocus-sidebar-sections.js"
const subSections = document.querySelectorAll('.sub-sections')


function hideAllSubSections(){
    subSections.forEach(el => {
        if(el.classList.contains('show')){
            el.classList.add('drop')
        } else {
            el.classList.remove('drop')
        }
        
    })
}
hideAllSubSections()

sections.forEach(el => {
    el.addEventListener('click', e => {
        e.preventDefault()
        e.stopPropagation()
        const sectionsContainer = getSectionContainer(e.target.parentElement)
        const subSections = sectionsContainer.querySelector('.sub-sections')
        toggleSubSections(subSections)
        
    })
    el.addEventListener('keydown', e => {
        let letter = e.key.toLowerCase() 
        const sectionsContainer = getSectionContainer(e.target.parentElement)
        const subSections = sectionsContainer.querySelector('.sub-sections')
        if(letter == 'enter' ){
            e.preventDefault()
            e.stopPropagation()
            toggleSubSections(subSections)
        }
        
    })
})
function toggleSubSections(el){
        if(el.classList.contains('show')){
            el.classList.remove('show')
        } 
        hideAllSubSections()
        el.classList.toggle('drop')

}
export function getSectionContainer(parent){
    if(parent.classList.contains('section-container')){
        return parent
    } else if (parent.parentElement){
        return getSectionContainer(parent.parentElement)
    } else {
        return null
    }
}