// src/services/allUnitsService.ts

async function getAllUnits(session_id: string) {
    const url = `https://hst-api.wialon.us/wialon/ajax.html?svc=core/search_items&params={"spec":{"itemsType":"avl_unit","propName":"*","propValueMask":"*","sortType":"sys_name"},"force":1,"flags":257,"from":0,"to":4294967295}&sid=${session_id}`;
    // Make a request to the URL
    const response = await fetch(url);

    // Check if the request was successful
    if (!response.ok) {
        throw new Error('Failed to fetch units');
    } else {
        // Parse the response body as JSON
        const data = await response.json();

        // Return the data
        return data;
    }
}

export default getAllUnits;