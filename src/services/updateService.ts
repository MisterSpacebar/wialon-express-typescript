// src/services/updateService.ts
import fs from 'fs';

const updateService = async (data: any, sessionId: any) => {

    const url = `https://hst-api.wialon.us/wialon/ajax.html?svc=core/batch&sid=${sessionId}`;
    fs.writeFileSync('stringifiedData.txt', JSON.stringify(data));

    // set up parameter array for the request
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `params=${encodeURIComponent(JSON.stringify(data))}`
    });

    // Check if the request was successful
    if (!response.ok) {
        throw new Error('Failed to update data');
    } else {
        const responseData = await response.json();
        console.log('(express/service/update) Data uploaded successfully');
        fs.writeFileSync('updateServiceResponse.txt', JSON.stringify(responseData));
        return responseData;
    }
};

export default updateService;