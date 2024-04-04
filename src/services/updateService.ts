// src/services/updateService.ts

const updateService = async (data: any, sessionId: any) => {

    const url = `https://hst-api.wialon.us/wialon/ajax.html?svc=core/batch&sid=${sessionId}`;

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
        throw new Error('Failed to upload data');
    } else {
        const responseData = await response.json();
        console.log('Data uploaded successfully');
        console.log('Response:', responseData);
        return responseData;
    }
};

export default updateService;