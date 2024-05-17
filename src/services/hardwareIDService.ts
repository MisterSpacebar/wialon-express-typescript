// express/services/hardwareIDService.ts
// Path: wialon-express-typescript/src/services/logoutService.ts

async function hardwareIDService(hardware_ids: number[], session_id: string) {
    let url = `https://hst-api.wialon.us/wialon/ajax.html?svc=core/get_hw_types&params={"filterType":"id","filterValue":[${hardware_ids}],"includeType":true,"ignoreRename":false}&sid=${session_id}`;

    let response = await fetch(url);
    if(!response.ok) {
        throw new Error('Failed to fetch hardware IDs');
    } else {
        let data = await response.json();
        console.log('(express/services/hardware) Hardware ID data:', data);

        return data;
    }
}

export default hardwareIDService;