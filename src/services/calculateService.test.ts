import { calculateFootprint } from "./calculationService";

jest.mock('../clients/footprintClient');
jest.mock('../clients/transportClient');

const mockFootprintData = [
    { identifier: 'footprint1', footprint_value: 10, country: 'DE' },
    { identifier: 'footprint2', footprint_value: 20, country: 'DE' },
    { identifier: 'footprint3', footprint_value: 30, country: 'IT' }
];
const mockTransportData = [
    { identifier: 'transport1', factor: 2, target_country: 'IT', origin_country: 'DE' },
    { identifier: 'transport2', factor: 3, target_country: 'IT', origin_country: 'DE' },
    { identifier: 'transport3', factor: 4, target_country: 'FR', origin_country: 'IT' }
];

const mockFetchFootprintData = require('../clients/footprintClient').fetchFootprintData;
const mockFetchTransportData = require('../clients/transportClient').fetchTransportData;
describe('calculateFootprint', () => {

    it('should calculate footprint correctly', async () => {
        mockFetchFootprintData.mockResolvedValue(mockFootprintData);
        mockFetchTransportData.mockResolvedValue(mockTransportData);

        const result = await calculateFootprint('footprint1', 'transport1', 'IT');

        expect(result).toBe(20);
        expect(mockFetchFootprintData).toHaveBeenCalledTimes(1);
        expect(mockFetchTransportData).toHaveBeenCalledTimes(1);
    });

    it('should throw InvalidFootprintError for invalid footprint', async () => {
        mockFetchFootprintData.mockResolvedValue(mockFootprintData);
        mockFetchTransportData.mockResolvedValue(mockTransportData);

        await expect(calculateFootprint('invalid_footprint', 'transport1', 'IT')).rejects.toThrow(
            'Invalid footprint or transport type'
        );
    });

    it('should throw InvalidTransportationError for invalid transport', async () => {
        mockFetchFootprintData.mockResolvedValue(mockFootprintData);
        mockFetchTransportData.mockResolvedValue(mockTransportData);

        await expect(calculateFootprint('footprint1', 'invalid_transport', 'IT')).rejects.toThrow(
            'Invalid transport type or target country'
        );
    });
})