// ==UserScript==  
// @name         Download Selected Image  
// @namespace    http://tampermonkey.net/  
// @version      1.0  
// @description  Add a button to download the selected image with a custom file name.  
// @author       Your Name  
// @match        *://*/*  
// @grant        none  
// ==/UserScript==  

(function () {  
    'use strict';  

    // Create and style the "Download Selected Image" button  
    const downloadImageButton = document.createElement('button');  
    downloadImageButton.innerText = 'Download Selected Image';  
    downloadImageButton.style.position = 'fixed';  
    downloadImageButton.style.bottom = '10px';  
    downloadImageButton.style.right = '10px';  
    downloadImageButton.style.zIndex = 1000;  
    downloadImageButton.style.padding = '10px 15px';  
    downloadImageButton.style.backgroundColor = '#28a745';  
    downloadImageButton.style.color = '#fff';  
    downloadImageButton.style.border = 'none';  
    downloadImageButton.style.borderRadius = '5px';  
    downloadImageButton.style.cursor = 'pointer';  

    // Append the button to the page  
    document.body.appendChild(downloadImageButton);  

    // Add a click event listener to the button  
    downloadImageButton.addEventListener('click', () => {  
        // Get the selected image element  
        const selection = window.getSelection();        
        let selectedImage = null;  

        if (selection.rangeCount > 0) {  
            const currentRange = selection.getRangeAt(0);  
            const container = currentRange.commonAncestorContainer;  

            // Look for the closest image if one was selected or clicked  
            if (container.nodeType === Node.ELEMENT_NODE) {  
              selectedImage  عکس or nulletc per user promosing matriculation