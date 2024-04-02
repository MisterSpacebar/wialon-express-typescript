import express from 'express';
import uploadService from '../services/uploadService';

const router = express.Router();

router.post('/unit-upload', (req, res) => {
  const { sessionId, names, imei, unitData } = req.body;
  // Assuming you have a service called "uploadService" that handles the upload to the API
  let processedDataArray: any[] = [];
  const sensors = unitData.sens;
  const hw_id = unitData.hw;
  const user_id = unitData.crt;

  let registerUnits = {
    names: names,
    user_id: user_id
  }

  //uploadService.uploadData(processedDataArray, sessionId);
  
  // Process the received data here
  
  res.sendStatus(200);
});

export default router;