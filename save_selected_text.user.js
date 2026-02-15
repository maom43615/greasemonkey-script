// ==UserScript==  
// @name         Save Selected Text as TXT  
// @namespace    http://tampermonkey.net/  
// @version      1.0  
// @description  Add a button to download selected text as a .txt file  
// @author       Your Name  
// @match        *://*/*  
// @grant        none  
// ==/UserScript==  

(function() {  
    'use strict';  

    // Create and style the "Download" button  
    const downloadButton = document.createElement('button');  
    downloadButton.innerText = 'Download Selected Text';  
    downloadButton.style.position = 'fixed';  
    downloadButton.style.bottom = '10px';  
    downloadButton.style.right = '10px';  
    downloadButton.style.zIndex = 1000;  
    downloadButton.style.padding = '10px 15px';  
    downloadButton.style.backgroundColor = '#007bff';  
    downloadButton.style.color = '#fff';  
    downloadButton.style.border = 'none';  
    downloadButton.style.borderRadius = '5px';  
    downloadButton.style.cursor = 'pointer';  

    // Append the button to the page  
    document.body.appendChild(downloadButton);  

    // Add a click event listener to the button  
    downloadButton.addEventListener('click', () => {  
        const selectedText = window.getSelection().toString();  

        if (!selectedText) {  
            alert('Please select some text first!');  
            return;  
        }  

        // Prompt the user to enter the desired file name  
        const fileName = prompt('Enter file name (without extension):', 'selected-text');  

        if (!fileName) {  
            alert('Download canceled: No file name provided.');  
            return;  
        }  

        // Create a Blob with the selected text  
        const blob = new Blob([selectedText], { type: 'text/plain' });  

        // Create a link element for downloading  
        const link = document.createElement('a');  
        link.href = URL.createObjectURL(blob);  
        link.download = fileName + '.txt';  

        // Programmatically click the link to trigger the download  
        link.click();  

        // Revoke the URL object to free memory  
        URL.revokeObjectURL(link.href);  
    });  
})();