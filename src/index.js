import submitSetup from './OCR.js'
import getActiveIngredients from './drugLookup.js'

submitSetup()

let drugInfo

getActiveIngredients('aspirin').then((activeIngredients) => {
    console.log("Drug Info Found!");
    console.log(drugInfo)
    drugInfo = activeIngredients
})


