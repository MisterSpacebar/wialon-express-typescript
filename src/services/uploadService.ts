// src/services/uploadService.ts

const uploadData = async (data: Array<any>, sessionId: any) => {

    const url = `https://hst-api.wialon.us/wialon/ajax.html?svc=core/batch&sid=${sessionId}`;
    
    return "Data uploaded successfully!"
};

export default uploadData;