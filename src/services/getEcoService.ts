// src/services/getEcoService.ts
import fs from 'fs';

// fetches the eco driving data for the unit
// requires the template id of the unit
async function getEcoService(template_id: number, session_id: string) {
    console.log('Fetching eco driving data...');
    // Construct the URL with the template id
    const url: string = `https://hst-api.wialon.us/wialon/ajax.html?svc=unit/get_drive_rank_settings&params={"itemId":${template_id}}&sid=${session_id}`;

    // Make a request to the URL
    const response = await fetch(url);

    // Check if the request was successful
    if (!response.ok) {
        throw new Error('Failed to fetch eco driving data');
    } else {
        // Parse the response body as JSON
        const data = await response.json();
        fs.writeFileSync('getEcoData.txt', JSON.stringify(data));

        // Return the data
        return data;
    }
}

export default getEcoService;