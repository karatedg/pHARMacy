import submitSetup from './OCR.js'
import getActiveIngredients from './drugLookup.js'

submitSetup()


const drugInfo = await getActiveIngredients('aspirin').then((data) => {
    console.log("Drug Info Found!");

})

console.log(drugInfo)
