

console.log("Success")

function submitSetup() {
    document.getElementById('submitImage').addEventListener('click', function(event) {
        event.preventDefault();  // Prevent the form from submitting traditionally

        console.log("Success button click");
        const fileInput = document.getElementById('imageFile');
        const file = fileInput.files[0];

        if (file) {
            // Generate a local URL for the uploaded image
            const imageUrl = URL.createObjectURL(file);
            console.log('Local Image URL:', imageUrl);  // This is the local URL for the image

            // You can use this URL in your OCR logic or display the image
            document.getElementById('ocrText').textContent = "Processing image...";
            
            // Call your OCR function with the local image URL
            processOCR(imageUrl);
        } else {
            alert("Please select a file.");
        }
    });
}


document.getElementById('submitImage').addEventListener('click', function() {
    console.log('clicked');
});


function processOCR(url) {
    /*
    console.log('Processing image:', url);
    Tesseract.recognize(
        url,
        'eng',
        { logger: m => console.log(m) }
    ).then(({ data: { text } }) => {
        console.log(text);
        document.getElementById('ocrText').textContent = text;
    });
    */

    (async () => {
        const worker = await Tesseract.createWorker('eng');
        const ret = await worker.recognize(url);
        console.log(ret.data.text);
        await worker.terminate();

        let cleanedText = cleanRead(ret.data.text);
        document.getElementById('ocrText').textContent = cleanedText;
      })();

    
}

function cleanRead(input) {
    // Convert to lowercase
    let lowercased = input.toLowerCase();

    // Remove symbols using a regular expression (keep only letters, numbers, and spaces)
    let cleaned = lowercased.replace(/[^a-z0-9\s]/g, '');

    return cleaned;
}


export default submitSetup;