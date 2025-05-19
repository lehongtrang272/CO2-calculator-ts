import { NextFunction, Request, Response } from 'express';
import { calculateFootprint } from '../services/calculationService';
import { InvalidFootprintError } from '../errors/InvalidFootprintError';
import { InvalidTransportationError } from '../errors/InvalidTransportationError';
import { ExternalDataError } from '../errors/ExternalDataError';

export async function calculate(req: Request, res: Response, next: NextFunction) : Promise<Response> {
    try {
        const { footprint, transport, targetCountry } = req.body;

        if (!footprint || !transport || !targetCountry) {
            return res.status(400).json({ error: `Missing required parameters ${req.body}` });
        }

        const footprintValue = await calculateFootprint(
            footprint,
            transport,
            targetCountry
        );

        return res.status(200).json({ result: footprintValue });
    } catch (error) {
        if (error instanceof InvalidFootprintError || error instanceof InvalidTransportationError) {
            return res.status(400).json({ error: error.message });
        } else if (error instanceof ExternalDataError) {
            return res.status(500).json({ error: 'External data fetch failed' });
        } else {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}