
export function handleCodeFocus(){


    // const scriptsContainer = document.querySelector('#scriptsContainer')
    const parentCopyCode = document.querySelector('#scriptsContainer > .code-container > pre.copy-code')
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
    const innerCopyCodes = parentCopyCode.querySelectorAll('.code-container .copy-code')
    let iInnerCode
    // let started = 
    parentCopyCode.addEventListener('keydown', e => {
        let letter = e.key.toLowerCase() 
        if(letter == 'tab'){
            e.target.scrollIntoView({behavior: 'auto', block: 'start'})
        }
        
    })
    innerCopyCodes.forEach(el  =>{
        el.addEventListener('focus', e => {
            scriptHasFocusIn = true 
            console.log('ksljdf')    
        })
    })
    canvasMainCode.addEventListener('focus', e => {
        scriptHasFocusIn = true 
        
    })
 
    

}