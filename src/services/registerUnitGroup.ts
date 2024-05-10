// src/services/unitGroupService.ts

// updates unit groups on a specific device
// the array of grouped units is an array of all unit IDs in the unit group
// will be required to update this at a per unit group basis
async function registerUnitGroups(session_id: string, unit_group_id: number, grouped_units: any[]) {
    let url = `https://hst-api.wialon.us/wialon/ajax.html?svc=unit_group/update_units&params={"itemId":${unit_group_id},"units":[${grouped_units}]}&sid=${session_id}`;
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

export default registerUnitGroups;