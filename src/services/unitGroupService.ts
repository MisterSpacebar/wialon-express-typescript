// src/services/unitGroupService.ts

// retrieves all unit groups for a given session
async function getUnitGroups(session_id: string) {
    let url = `https://hst-api.wialon.us/wialon/ajax.html?svc=core/search_items&params={"spec":{"itemsType":"avl_unit_group","propName":"sys_name","propValueMask":"*","sortType":"sys_name"},"force":1,"flags":1,"from":0,"to":0}&sid=${session_id}`;
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

export default getUnitGroups;