function loadScript(injectScript) {
    // Fetch the JavaScript file content
    fetch(injectScript)
        .then(response => response.text())
        .then(data => {
            parentCopyCode.innerHTML = data;
            // Extract script content
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = data;
            const scriptContent = parentCopyCode.textContent;
            // Remove old script elements if they exist

            // Create and append new script element
            const newScriptElement = document.createElement('script');
            newScriptElement.type = 'text/javascript';
            newScriptElement.textContent = scriptContent;
            newScriptElement.setAttribute('data-dynamic', 'true'); // Optional: mark as dynamic to easily remove later
            document.body.appendChild(newScriptElement);
        })
        .catch(error => console.error('Error loading script:', error));
}