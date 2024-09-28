async function getActiveIngredients(drugName) {
    const baseURL = 'https://api.fda.gov/drug/label.json'
    const query = `search=active_ingredient:\"${drugName}\"`

    try {
        const response = await fetch(`${baseURL}?${query}`);
        
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();

        console.log(data)
        
        if (data) {
            const activeIngredients = data.results[0].spl_product_data_elements;
            return activeIngredients;
        } else {
            throw new Error('No active ingredients found.');
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

//takes in the result from above as a string and parses it into an array by splitting it by commas.
function parseIngredients(ingredients) {
    return ingredients.split(',');
}

export default getActiveIngredients;