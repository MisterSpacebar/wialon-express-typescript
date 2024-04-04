import express from 'express';
import uploadService from '../services/uploadService';
import updateService from '../services/updateService';

const router = express.Router();

router.post('/units', async (req, res) => {
  const { sessionId, names, imei, unitData } = req.body;
  console.log('Session ID:', sessionId);
  console.log(unitData)
  // Assuming you have a service called "uploadService" that handles the upload to the API
  let processedDataArray: any[] = [];
  let unitIDs: any[] = [];
  const sensors = unitData.sens;
  const hw_id = unitData.hw;
  const user_id = unitData.crt;

  //registration data to be sent to service
  let registerUnits = {
    names: names,
    user_id: user_id,
    hw_id: hw_id
  }

  console.log('Unit data:', unitData);

  //uploadService.uploadData(processedDataArray, sessionId);
  try {
    const unitResponse = await uploadService(registerUnits, sessionId);
    console.log('Unit response:', unitResponse);
    // capture unit ids
    unitIDs = unitResponse.map((unit: any) => {unit.item.id});

    // Process the received data here to update blank units with template properties
    unitIDs.forEach((item_id: any, index: number) => {

      const sensorData = Object.entries(sensors).map(([key, value]: [string, any], index) => {
        const svc_value = "unit/update_sensor";
        const new_param = {
          "itemId":item_id,
          "id":value.id,
          "callMode":"create",
          "unlink":1,
          "n":value.n,
          "t":value.t,
          "d":value.d,
          "m":value.m,
          "p":value.p,
          "f":value.f,
          "c":value.c,
          "vt":value.vt,
          "vs":value.vs,
          "tbl":value.tbl,
          "ct":value.ct,
          "mt":value.mt
        };
        processedDataArray.push({"svc":svc_value,params:new_param});
      });

      let updateTrip = {
        "svc": "unit/update_report_settings",
        "params": {
          "itemId":item_id,
          "type":unitData.rtd.type,
          "gpsCorrection":unitData.rtd.gpsCorrection,
          "minSat":unitData.rtd.minSat,
          "minMovingSpeed":unitData.rtd.minMovingSpeed,
          "minStayTime": unitData.rtd.minStayTime,
          "maxMessagesDistance":unitData.rtd.maxMessagesDistance,
          "minTripTime":unitData.rtd.minTripTime,
          "minTripDistance":unitData.rtd.minTripDistance
        }
      }
      processedDataArray.push(updateTrip);

      let speedData = {
        "svc": "unit/update_report_settings",
        "params": {
          "itemId":item_id,
          "params":{
            "speedLimit": 0,
            "maxMessagesInterval": 0,
            "dailyEngineHoursRate": 0,
            "urbanMaxSpeed": 60,
            "mileageCoefficient": 1,
            "fuelRateCoefficient": 0,
            "speedingTolerance": 5,
            "speedingMinDuration": 10,
            "speedingMode": 1
          }
        }
      }
      processedDataArray.push(speedData);

      let unique_id = {
        "svc": "unit/update_unique_id",
        "params": {
          "itemId":item_id,
          "deviceTypeId":hw_id,
          "uniqueId":imei[index]
        }
      }
      processedDataArray.push(unique_id);

    });
  } catch (error) {
    console.error('Failed to upload data:', error);
  }
  
  const updateResponse = await updateService(processedDataArray, sessionId);
  const update_res = await updateResponse.json();

  console.log('Update response:', update_res);

  res.sendStatus(200);
});

export default router;