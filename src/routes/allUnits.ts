import express from 'express';
import getAllUnits from '../services/allUnitsService';
import getUnitGroups from '../services/unitGroupService';
import fs from 'fs';
import { json } from 'stream/consumers';

const router = express.Router();

router.get('/all-units/:session_id/:unit_query', async (req, res) => {
    console.log('connected to units route');
    console.log('session_id: ',req.params.session_id);
    const session_id = req.params.session_id;
    let unit_query = req.params.unit_query;
    try {
        const units = await getAllUnits(session_id,unit_query);
        fs.writeFileSync('loadedTemplates.txt', JSON.stringify(units));

        const unitGroups: any = await getUnitGroups(session_id);
        req.session.unit_group = unitGroups.items;
        //console.log('(express/routes/allUnits) unit group response: '+unitGroups);
        console.log('(express/routes/allUnits) unit group session: ',req.session.unit_group);
        fs.writeFileSync('unitGroupResponse.txt', JSON.stringify(unitGroups.items));
        
        res.json(units);
    } catch (err) {
        console.log(err);
        res.status(500).send('Failed to fetch units');
    }
});

export default router;