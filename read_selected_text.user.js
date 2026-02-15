// ==UserScript==
// @name         Read Selected Text
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Add a read button to read selected text aloud
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Create the button
    const button = document.createElement('button');
    button.innerText = 'Read Aloud';
    button.style.position = 'fixed';
    button.style.bottom = '20px';
    button.style.right = '20px';
    button.style.padding = '10px';
    button.style.backgroundColor = '#4CAF50';
    button.style.color = '#fff';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.zIndex = 1000;

    document.body.appendChild(button);

    // Function to read the selected text
    button.addEventListener('click', () => {
        const selectedText = window.getSelection().toString();
        if (selectedText) {
            const utterance = new SpeechSynthesisUtterance(selectedText);
            speechSynthesis.speak(utterance);
        } else {
            alert('Please select some text to read.');
        }
    });
})();