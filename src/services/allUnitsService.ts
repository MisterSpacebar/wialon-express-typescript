// src/services/allUnitsService.ts

// search for all units with a given query
// this is used to populate the unit table in the UI
async function getAllUnits(session_id: string, unit_query: string) {
    const url = `https://hst-api.wialon.us/wialon/ajax.html?svc=core/search_items&params={"spec":{"itemsType":"avl_unit","propName":"sys_name","propValueMask":"*${unit_query}*","sortType":"sys_name"},"force":1,"flags":4611686018427387903,"from":0,"to":4294967295}&sid=${session_id}`;
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