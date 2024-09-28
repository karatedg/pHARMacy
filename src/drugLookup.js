async function getActiveIngredients(drugName) {
    const baseURL = 'https://api.fda.gov/drug/label.json'
    const query = `search=active_ingredient:\"${drugName}\"`

    try {
        console.log("Fetching data...");
        const response = await fetch(`${baseURL}?${query}`);
        
        if (!response.ok) {
            throw new Error(`Error in fetch`);
        }

        const responseData = await response.json();

        console.log(responseData)
        
        if (responseData) {
            const returning = responseData.results[0].spl_product_data_elements[0];
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