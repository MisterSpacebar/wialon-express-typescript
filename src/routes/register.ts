import express from 'express';
import uploadService from '../services/uploadService';

const router = express.Router();

router.post('/unit-upload', (req, res) => {
  const { sessionId, names, imei, unitData } = req.body;
  // Assuming you have a service called "uploadService" that handles the upload to the API
  let processedDataArray: any[] = [];
  let sens = unitData.sens;
  let hw_id = unitData.hw;

  names.forEach((name: string, index: number) => {
    
  });

  //uploadService.uploadData(processedDataArray, sessionId);
  
  // Process the received data here
  
  res.sendStatus(200);
});

export default router;