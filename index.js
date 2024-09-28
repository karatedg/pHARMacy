import processOCR from './OCR.js';
import getActiveIngredients from './drugLookup.js'

let drug1
let drug2

document.getElementById('submitImage').addEventListener('click', runImageCheck());



async function runImageCheck(event) {
    event.preventDefault();
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
            const drugName = await processOCR(imageUrl);

            if (drugName) {
                console.log("Waiting for drug lookup")
                await getDrugData(drugName);
            } else {
                console.error('Error processing OCR')
            }
            
        } else {
            alert("Please select a file.");
        }

}

async function getDrugData(drug) {
    console.log("Getting drug data...");
    const info = await getActiveIngredients(drug)
    console.log('Drug Data:', info);

    if (info) {
        let ingredientsArray = info.split(',')
        console.log('Parsed Ingredients:', ingredientsArray);
    } else {
        console.error('Error fetching drug data');
    }
}


