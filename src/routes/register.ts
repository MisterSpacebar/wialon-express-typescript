import express from 'express';
import uploadService from '../services/uploadService';
import updateService from '../services/updateService';

const router = express.Router();

router.post('/unit-upload', async (req, res) => {
  const { sessionId, names, imei, unitData } = req.body;
  // Assuming you have a service called "uploadService" that handles the upload to the API
  let processedDataArray: any[] = [];
  let unitIDs: any[] = [];
  const sensors = unitData.sens;
  const hw_id = unitData.hw;
  const user_id = unitData.crt;

  let registerUnits = {
    names: names,
    user_id: user_id,
    hw_id: hw_id
  }

  //uploadService.uploadData(processedDataArray, sessionId);
  try {
    const unitResponse = await uploadService(registerUnits, sessionId);
    console.log('Unit response:', unitResponse);
    unitIDs = unitResponse.map((unit: any) => unit.item.id);
  } catch (error) {
    console.error('Failed to upload data:', error);
  }
  
  // Process the received data here
  
  res.sendStatus(200);
});

export default router;