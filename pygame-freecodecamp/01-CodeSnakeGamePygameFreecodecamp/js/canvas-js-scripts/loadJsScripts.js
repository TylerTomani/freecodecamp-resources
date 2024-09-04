
export function injectJsScripts(){
    let injectScript = `./js/canvas-js-scripts/03-js-drawMove.js`;
    const jsCanvasScriptContainer = document.querySelector('#jsCanvasScriptContainer')
    const jsParenCode = jsCanvasScriptContainer.querySelector(' #mainCode')
    const tempScript = document.getElementById('tempScript')

    loadScript(injectScript);
    
    function loadScript(injectScript) {
        // Fetch the JavaScript file content
        fetch(injectScript)
            .then(response => response.text())
            .then(data => {
                // fill .copy-code innerText
                jsParenCode.innerHTML = data
                // Assign tempScript's source
                const scriptContent = jsParenCode.textContent
                tempScript.setAttribute('id', 'tempScript')
                tempScript.type = 'text/javascript';
                tempScript.textContent = scriptContent;
                tempScript.setAttribute('data-dynamic', 'true'); // Optional: mark as dynamic to easily remove later
            })
            .catch(error => console.error('Error loading script:', error));
    }
    
}
