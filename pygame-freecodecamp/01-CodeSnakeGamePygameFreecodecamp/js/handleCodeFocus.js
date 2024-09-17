
export function handleCodeFocus(){


    // const scriptsContainer = document.querySelector('#scriptsContainer')
    const parentCopyCode = document.querySelector('.code-container > pre.copy-code')
    const canvasMainCode = document.querySelector('#jsCanvasScriptContainer > #scriptsContainer >.code-container > pre.copy-code')
    
    let clickedParent = false
    let scriptHasFocusIn = false
    const keys = {
        shift: {
            pressed: false
        },
        command: {
            pressed: false
        }
    }
    let innerCopyCodes 
    parentCopyCode.addEventListener('keydown', e => {
        let letter = e.key.toLowerCase() 
        if(letter == 'tab'){
            innerCopyCodes = parentCopyCode.querySelectorAll('.code-container .copy-code')
            // console.log(innerCopyCodes.length)
        }
        console.log(scriptHasFocusIn)
        
    })
    innerCopyCodes.forEach(el  =>{
        el.addEventListener('focus', e => {
            e.target.scrollIntoView({behavior: 'auto', block: 'start'})
            console.log(e.target)
            scriptHasFocusIn = true 
        })
    })
    canvasMainCode.addEventListener('focus', e => {
        scriptHasFocusIn = true 
        
    })
 
    

}