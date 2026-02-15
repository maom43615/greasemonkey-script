// ==UserScript==
// @name         Detect Audio/MP3 and Add Download Button
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Detect any audio or MP3 on the page and add download buttons to download them easily.
// @author       Your Name
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    /**
     * Function to add download buttons for audio/MP3 files detected on the page.
     */
    function addAudioDownloadButtons() {
        console.log('[Tampermonkey] Checking for audio or MP3 files on the page...');

        let audioElementsFound = false;

        //
        // 1. Scan for <audio> elements loaded on the page
        //
        const audioElements = document.querySelectorAll('audio[src], audio > source[src]');
        audioElements.forEach(audioElement => {
            audioElementsFound = true;

            // Get the source URL of the audio
            const audioUrl = audioElement.src || audioElement.querySelector('source')?.src;

            if (audioUrl) {
                console.log(`[Tampermonkey] Detected audio source: ${audioUrl}`);

                // Create the "Download Audio" button
                const downloadButton = createDownloadButton(audioUrl);

                // Insert the button after the audio element
                if (!audioElement.nextSibling || audioElement.nextSibling.textContent !== 'Download Audio') {
                    audioElement.parentNode.insertBefore(downloadButton, audioElement.nextSibling);
                }
            }
        });

        //
        // 2. Scan for <a> elements with links pointing to .mp3 files
        //
        const mp3Links = document.querySelectorAll('a[href$=".mp3"]');
        mp3Links.forEach(link => {
            audioElementsFound = true;

            const mp3Url = link.href;
            console.log(`[Tampermonkey] Detected MP3 link: ${mp3Url}`);

            // Create the "Download MP3" button
            const downloadButton = createDownloadButton(mp3Url);

            // Insert the button after the link
            if (!link.nextSibling || link.nextSibling.textContent !== 'Download MP3') {
                link.parentNode.insertBefore(downloadButton, link.nextSibling);
            }
        });

        if (!audioElementsFound) {
            console.log('[Tampermonkey] No audio or MP3 files found on this page.');
        }
    }

    /**
     * Create a "Download" button for a given audio or MP3 URL.
     * @param {string} url - The URL of the audio file.
     * @returns {HTMLElement} - The button element.
     */
    function createDownloadButton(url) {
        const button = document.createElement('button');
        button.textContent = 'Download Audio';
        button.style.marginLeft = '10px';
        button.style.padding = '5px 10px';
        button.style.backgroundColor = '#28a745';
        button.style.color = 'white';
        button.style.border = 'none';
        button.style.borderRadius = '4px';
        button.style.cursor = 'pointer';

        // Add the download functionality
        button.addEventListener('click', () => {
            const downloadLink = document.createElement('a');
            downloadLink.href = url;
            downloadLink.download = ''; // Keep the same filename as the source provided
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        });

        return button;
    }

    // Run when the page finishes loading
    window.addEventListener('load', () => {
        console.log('[Tampermonkey] Page loaded. Running audio/MP3 detection...');
        addAudioDownloadButtons();
    });
})();