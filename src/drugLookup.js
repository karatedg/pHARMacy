async function getActiveIngredients(drugName) {
    const baseURL = 'https://api.fda.gov/drug/label.json?search=drug_interactions:'
    const query = `${drugName}&count=openfda.substance_name.exact`

    try {
        console.log("Fetching data...");
        const response = await fetch(`${baseURL}${query}`);
        
        if (!response.ok) {
            throw new Error(`Error in fetch`);
        }

        const responseData = await response.json();

        console.log(responseData)
        
        if (responseData) {
            const returning = responseData.results;
            console.log(returning)
            return returning;
        } else {
            throw new Error('No active ingredients found.');
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

//takes in the result from above as a string and parses it into an array by splitting it by commas.

export default getActiveIngredients;