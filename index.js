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
        let drug1
        let drugName1

        if (file) {
            // Generate a local URL for the uploaded image
            const imageUrl = URL.createObjectURL(file);
            console.log('Local Image URL:', imageUrl);  // This is the local URL for the image

            // You can use this URL in your OCR logic or display the image

            const ocrText = document.getElementById('ocrText');
            ocrText.textContent = "Processing image...";
            
            // Call your OCR function with the local image URL
            drugName1 = await processOCR(imageUrl);

            if (drugName1) {
                ocrText.textContent = drugName1
                console.log("Waiting for drug lookup")
                drug1 = await getDrugData(drugName1);
            } else {
                console.error('Error processing OCR')
            }
        } else {
            alert("Please select a file.");
        }

        const fileInput2 = document.getElementById('imageFile2');
        const file2 = fileInput2.files[0];
        let drugName2
        let drug2

        if (file2) {
            // Generate a local URL for the uploaded image
            const imageUrl2 = URL.createObjectURL(file2);
            console.log('Local Image URL:', imageUrl2);  // This is the local URL for the image

            // You can use this URL in your OCR logic or display the image
            const ocrText2 = document.getElementById('ocrText2');
            ocrText2.textContent = "Processing image...";
            
            // Call your OCR function with the local image URL
            drugName2 = await processOCR(imageUrl2);

            if (drugName2) {
                ocrText2.textContent = drugName2
                console.log("Waiting for drug lookup")
                drug2 = await getDrugData(drugName2);
                console.log(drug2)
            } else {
                console.error('Error processing OCR')
            }
        } else {
            alert("Please select a file.");
        }

        console.log("Both drugs have been processed. Ready to compare.");
        console.log("Drug Name 1: ", drugName1)
        console.log("Drug 1 Conf: ", drug1)
        console.log("Drug Name 2: ", drugName2)
        console.log("Drug 2 Conf: ", drug2)

        let conflict1 = runConflictCheck(drugName1, drug2);
        let conflict2 = runConflictCheck(drugName2, drug1);


        if (conflict1 || conflict2) {
            console.log("Conflict confirmed.");
            document.getElementById('overlap-text').textContent = "Conflict detected.";
        }


}

function runConflictCheck(drugName, conflictsArray) {
    for (let i = 0; i < conflictsArray.length; i++) {
        /*
        console.log("Checking:", conflictsArray[i].term.toLowerCase());
        console.log("Length:", conflictsArray[i].term.toLowerCase().length);
        console.log("Against:", drugName);
        console.log("Length:", drugName.length);
        */
        if (drugName.trim() === conflictsArray[i].term.toLowerCase().trim()) {
            console.log("Conflict detected.");
            return true;
        }
    }
    console.log("No conflicts detected.");
    return false;
}



async function getDrugData(drug) {
    console.log("Getting drug data...");
    const info = await getActiveIngredients(drug)
    console.log('Drug Data:', info);

    if (info) {
        /*
        let ingredientsArray = info.split(',')
        console.log('Parsed Ingredients:', ingredientsArray);
        return ingredientsArray;
        */
    } else {
        console.error('Error fetching drug data');
    }

    return info
}


