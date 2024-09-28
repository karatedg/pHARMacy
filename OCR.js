

async function processOCR(url) {
        const worker = await Tesseract.createWorker('eng');
        const ret = await worker.recognize(url);
        console.log(ret.data.text);
        await worker.terminate();

        let cleanedText = cleanRead(ret.data.text);
        document.getElementById('ocrText').textContent = cleanedText;
        return cleanedText
    
}

function cleanRead(input) {
    // Convert to lowercase
    let cleaned = input.toLowerCase().replace(/[^a-z0-9\s]/g, '');;
    // Remove symbols using a regular expression (keep only letters, numbers, and spaces)

    return cleaned;
}


export default processOCR;