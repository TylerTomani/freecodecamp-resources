
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
    canvasMainCode.addEventListener('focusin', e => {
        scriptHasFocusIn = true 
    })
    canvasMainCode.addEventListener('focusout', e => { 
        scriptHasFocusIn = false 
        clickedParent = false
    })
    let iInnerCode = 0
    canvasMainCode.addEventListener('keydown', e => {
        let letter = e.key.toLowerCase()
        let innerCopyCodes = e.target.querySelectorAll('.copy-code')
        if(letter == 'enter'){
            clickedParent = true
            
        }
        if(letter == 'c' && innerCopyCodes){
            
            // innerCopyCodes[iInnerCode].focus()
            // console.log(innerCopyCodes[iInnerCode])
            // iInnerCode = (iInnerCode + 1) % innerCopyCodes.length
        }


        if(clickedParent){
            innerCopyCodes.forEach(el => { el.setAttribute('tabindex','0')})
        } else {
            innerCopyCodes.forEach(el => { el.setAttribute('tabindex','-1')})

        }
        

        
    })
    // addEventListener('keydown', e => {
    //     let letter = e.key.toLowerCase()
    //     if (letter == 'shift') { keys.shift.pressed = true }
    //     if (letter == 'meta') { keys.command.pressed = true }

    //     // if(letter == 'c' && !keys.command.pressed){
    //     //     canvasEl.focus()
    //     // }
    //     // if(letter == 'f' && !keys.command.pressed){
    //     //     footer.focus()
    //     // }
    //     if (letter == 's' && keys.shift.pressed) {
    //         parentCopyCode.focus()
    //     }
    //     if(letter == 'enter'){
    //         clickedParent = true
    //         innerCopyCodes = e.target.querySelectorAll('.copy-code')
    //     }
    //     // console.log(clickedParent)
    //     if (clickedParent && scriptHasFocusIn && innerCopyCodes) {
    //         innerCopyCodes.forEach(el => {el.setAttribute('tabindex', '0')})
    //         if (!isNaN(letter)) {
    //             let intLet = parseInt(letter)
    //             if (innerCopyCodes.length > 0) {
    //                 if (intLet <= innerCopyCodes.length) {
    //                     innerCopyCodes[intLet - 1].focus()
    //                 } else {
    //                     parentCopyCode.focus()
    //                 }
    //             }
            
    //         }
    //     } else {
    //         innerCopyCodes.forEach(el => { el.setAttribute('tabindex', '-1') })
    //     }

    //     if (!isNaN(letter)) {
    //         let intLetter = parseInt(letter)
    //         if (intLetter <= arrScripts.length) {

    //             htmlScript = arrScripts[intLetter]
    //             htmlScript = `./scripts-html/${htmlScript}`
    //             loadScript(htmlScript)
    //             displayPartTitle(intLetter - 1)
    //         }
    //     }
    // })

}