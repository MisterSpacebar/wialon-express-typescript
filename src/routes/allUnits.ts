import express from 'express';
import getAllUnits from '../services/allUnitsService';

const router = express.Router();

router.get('/all-units/:session_id', async (req, res) => {
    console.log('connected to all-units route');
    console.log('session_id: ',req.params.session_id);
    const session_id = req.params.session_id;
    try {
        const units = await getAllUnits(session_id);
        console.log('Units:', units);
        res.json(units);
    } catch (err) {
        console.log(err);
        res.status(500).send('Failed to fetch units');
    }
});

export default router;