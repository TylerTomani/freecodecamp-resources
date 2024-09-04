
export function injectJsScripts(){
    let injectScript = `./js/canvas-js-scripts/03-js-drawMove.js`;
    const jsCanvasScriptContainer = document.querySelector('#jsCanvasScriptContainer')
    const jsParenCode = jsCanvasScriptContainer.querySelector(' #mainCode')


    console.log("Injecting script:", injectScript);

    loadScript(injectScript);
    
    function loadScript(injectScript) {
        // Fetch the JavaScript file content
        fetch(injectScript)
            .then(response => response.text())
            .then(data => {
                jsParenCode.innerHTML = data
                console.log(data)
                // Extract script content
                // const tempDiv = document.createElement('div');
                // tempDiv.innerHTML = data;
                // const scriptContent = parentScript.textContent;

                // // Remove old script elements if they exist

                // // Create and append new script element
                const scriptContent = jsParenCode.textContent
                const newScriptElement = document.createElement('script');
                newScriptElement.type = 'text/javascript';
                newScriptElement.textContent = scriptContent;
                newScriptElement.setAttribute('data-dynamic', 'true'); // Optional: mark as dynamic to easily remove later
                document.body.appendChild(newScriptElement);
            })
            .catch(error => console.error('Error loading script:', error));
    }
    
}
