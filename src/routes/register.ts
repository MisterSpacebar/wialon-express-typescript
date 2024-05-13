import express from 'express';
import uploadService from '../services/uploadService';
import updateService from '../services/updateService';
import { parse } from 'path';
import fs from 'fs';
import getUnitGroups from '../services/unitGroupService';
import registerUnitGroups from '../services/registerUnitGroup';

const router = express.Router();

router.post('/units', async (req, res) => {
  // const { sessionId, names, imei, unitData } = req.body;
  let sessionId = req.body.session_id;
  let names = req.body.names;
  let imei = req.body.imeis;
  let unit_properties = req.body.unit_properties;

  if (!unit_properties || !sessionId || !names || !imei) {
    console.log('(express/routes/register) Session ID:', sessionId);
    console.log('(express/routes/register) Names:', names);
    console.log('(express/routes/register) IMEIs:', imei);
    //console.log('(express/routes/register) unit data:', unitData);
    return res.status(400).json({ error: 'unitData is required' });
  }
  console.log('(express/routes/register) Session ID:', sessionId);
  console.log('(express/routes/register) Names:', names);
  console.log('(express/routes/register) IMEIs:', imei);

  fs.writeFileSync('loadedTemplateData.txt', JSON.stringify(unit_properties));
  // Assuming you have a service called "uploadService" that handles the upload to the API
  let processedDataArray: any[] = [];
  let unitIDs: any[] = [];
  let unitGroupArray = [];
  const sensors = unit_properties.sens;
  const hw_id = unit_properties.hw;
  const user_id = unit_properties.crt;
  const template_id = unit_properties.id;

  //registration data to be sent to service
  let registerUnits = {
    names: names,
    user_id: user_id,
    hw_id: hw_id
  }

  try {
    console.log('(express/routes/register) create unit route hit');
    let unitResponse: any = await uploadService(registerUnits, sessionId, template_id);
    //console.log('(express/routes/register) Unit response:', unitResponse);
    fs.writeFileSync('uploadResponse.txt', JSON.stringify(unitResponse));

    // get elements of the response array that won't be iterated over
    let message_filters = unitResponse.pop();
    let report_settings = unitResponse.pop();

    // create an array of unit ids
    unitResponse.forEach((unit: any) => {
      unitIDs.push(unit.item.id);
    });
    fs.writeFileSync('unitIDs.txt', JSON.stringify(unitIDs));

    // Process the received data here to update blank units with template properties
    unitIDs.forEach((item_id: any, index: number) => {
      /**
       * Represents an array of sensor data objects.
       * Each sensor data object contains information about a sensor.
       * The sensor data objects are generated by mapping the entries of the `sensors` object.
       * @type {Array<{ svc: string, params: any }>}
       */
      const sensorData = Object.entries(sensors).map(([key, value]: [string, any], index) => {
        const svc_value = "unit/update_sensor";
        const new_param = {
          "itemId":parseInt(item_id),
          "id":parseInt(value.id),
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
        "svc": "unit/update_trip_detector",
        "params": {
          "itemId":parseInt(item_id),
          "type":unit_properties.rtd.type,
          "gpsCorrection":unit_properties.rtd.gpsCorrection,
          "minSat":unit_properties.rtd.minSat,
          "minMovingSpeed":unit_properties.rtd.minMovingSpeed,
          "minStayTime": unit_properties.rtd.minStayTime,
          "maxMessagesDistance":unit_properties.rtd.maxMessagesDistance,
          "minTripTime":unit_properties.rtd.minTripTime,
          "minTripDistance":unit_properties.rtd.minTripDistance
        }
      }
      processedDataArray.push(updateTrip);

      let speedData = {
        "svc": "unit/update_report_settings",
        "params": {
          "itemId":parseInt(item_id),
          "params":{
            "speedLimit": report_settings.speedLimit,
            "maxMessagesInterval": report_settings.maxMessagesInterval,
            "dailyEngineHoursRate": report_settings.dailyEngineHoursRate,
            "urbanMaxSpeed": report_settings.urbanMaxSpeed,
            "mileageCoefficient": report_settings.mileageCoefficient,
            "fuelRateCoefficient": report_settings.fuelRateCoefficient,
            "speedingTolerance": report_settings.speedingTolerance,
            "speedingMinDuration": report_settings.speedingMinDuration,
            "speedingMode": report_settings.speedingMode
          }
        }
      }
      processedDataArray.push(speedData);

      let filter_messages = {
        "svc":"unit/update_messages_filter",
        "params": {
          "itemId":parseInt(item_id),
					"enabled":message_filters.enabled,
					"skipInvalid":message_filters.skipInvalid,
					"minSats":message_filters.minSats,
					"maxHdop":message_filters.maxHdop,
					"maxSpeed":message_filters.maxSpeed,
					"lbsCorrection":message_filters.lbsCorrection
        }
      }
      processedDataArray.push(filter_messages);

      let unique_id = {
        "svc": "unit/update_device_type",
        "params": {
          "itemId":parseInt(item_id),
          "deviceTypeId":parseInt(hw_id),
          "uniqueId":imei[index]
        }
      }
      processedDataArray.push(unique_id);

      let calc_flag = {
        "svc":"unit/update_calc_flags",
        "params":{
          "itemId":parseInt(item_id),
          "newValue":parseInt(unit_properties.cfl)
        }
      }
      processedDataArray.push(calc_flag);
      
      let fuel_rates = {
        "svc":"unit/update_fuel_rates_params",
        "params":{
          "itemId":parseInt(item_id),	
					"consSummer":parseFloat(unit_properties.rfc.fuelConsRates.consSummer),
					"consWinter":parseFloat(unit_properties.rfc.fuelConsRates.consWinter),
					"winterMonthFrom":parseInt(unit_properties.rfc.fuelConsRates.winterMonthFrom),
					"winterDayFrom":parseInt(unit_properties.rfc.fuelConsRates.winterDayFrom),
					"winterMonthTo":parseInt(unit_properties.rfc.fuelConsRates.winterMonthTo),
					"winterDayTo":parseInt(unit_properties.rfc.fuelConsRates.winterDayTo)
        }
      }
      processedDataArray.push(fuel_rates);

      let fuel_math = {
        "svc":"unit/update_fuel_math_params",
        "params":{
          "itemId":parseInt(item_id),
          "idling":parseFloat(unit_properties.rfc.fuelConsMath.idling),
					"urban":parseFloat(unit_properties.rfc.fuelConsMath.urban),
					"suburban":parseFloat(unit_properties.rfc.fuelConsMath.suburban),
					"loadCoef":parseFloat(unit_properties.rfc.fuelConsMath.loadCoef),
        }
      }
      processedDataArray.push(fuel_math);
    });

  } catch (error) {
    console.error('Failed to upload data:', error);
  }
  
  try {
    // Convert the array to a JSON string with indentation
    const dataString = JSON.stringify(processedDataArray, null, 2);

    // Write the string to a file
    fs.writeFileSync('processedDataArray.txt', dataString);

    console.log('(express/routes/register) Session ID:', sessionId);
    const updateResponse = await updateService(processedDataArray, sessionId);
    fs.writeFileSync('updateResponse.txt', JSON.stringify(updateResponse));

    for (const item of req.session.unit_group!) {
      if(item.u.includes(template_id)){
        // read the unit group data
        let updated_data: any = await getUnitGroups(sessionId);
        let updated_items = updated_data.items;
        // find the group that contains the template id
        let updated_group = updated_items.find((group: any) => group.id == item.id);
        // add the new unit id to the group
        let updated_units = [...new Set([...updated_group.u, ...unitIDs])];
        const update_unit_group = await registerUnitGroups(sessionId, parseInt(updated_group.id), updated_units);
        console.log('(express/route/register) unit group updated:', update_unit_group);
      }
    }

  } catch (error) {
    console.error('(express/routes/register) Error in updateService:', error);
  }

  res.sendStatus(200);
});

export default router;