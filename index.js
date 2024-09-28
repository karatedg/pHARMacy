import processOCR from './OCR.js';
import getActiveIngredients from './drugLookup.js'

let drug1
let drug2

document.getElementById('submitImage').addEventListener('click', runImageCheck);



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
                const drug1 = await getDrugData(drugName);
            } else {
                console.error('Error processing OCR')
            }
        } else {
            alert("Please select a file.");
        }

        const fileInput2 = document.getElementById('imageFile2');
        const file2 = fileInput2.files[0];

        if (file2) {
            // Generate a local URL for the uploaded image
            const imageUrl2 = URL.createObjectURL(file2);
            console.log('Local Image URL:', imageUrl2);  // This is the local URL for the image

            // You can use this URL in your OCR logic or display the image
            document.getElementById('ocrText').textContent = "Processing image...";
            
            // Call your OCR function with the local image URL
            const drugName2 = await processOCR(imageUrl2);

            if (drugName2) {
                console.log("Waiting for drug lookup")
                const drug2 = await getDrugData(drugName2);
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
        return ingredientsArray;
    } else {
        console.error('Error fetching drug data');
    }
}


