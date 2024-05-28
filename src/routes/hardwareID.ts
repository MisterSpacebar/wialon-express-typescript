import express, { Request, Response } from 'express';
import hardwareIDService from '../services/hardwareIDService';

const router = express.Router();

router.get('/hardwareID/:session_id/:hardware_ids', async (req: Request, res: Response) => {
    try {
        // Call the hardwareIDService to fetch the data
        console.log('(express/routes/hardware) Fetching hardware ID data...');
        let hardware_ids: number[] = req.params.hardware_ids.split(',').map(Number);
        let data = await hardwareIDService(hardware_ids, req.params.session_id);

        // Send the data back to the client
        res.json(data);
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('(express/routes/hardware) Error fetching hardware ID data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;