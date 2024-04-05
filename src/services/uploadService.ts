// src/services/uploadService.ts
import fs from 'fs';

const uploadData = async (data: any, sessionId: any) => {

    const url = `https://hst-api.wialon.us/wialon/ajax.html?svc=core/batch&sid=${sessionId}`;

    // set up array of obects in format dictated by API
    let params = data.names.map((name: any) => {
        return {
            "svc": "core/create_unit",
            "params": {
                "creatorId":data.user_id,
                "name":name,
                "hwTypeId":data.hw_id,
                "dataFlags":257
            }
        }
    });

    // Make a request to the URL
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `params=${encodeURIComponent(JSON.stringify(params))}`
    });

    // Check if the request was successful
    if (!response.ok) {
        throw new Error('Failed to upload data');
    } else {
        const responseData = await response.json();
        console.log('(express/service/upload) Data uploaded successfully');
        fs.writeFileSync('uploadServiceResponse.txt', JSON.stringify(responseData));
        return responseData;
    }

};

export default uploadData;