import axios from 'axios';
import { Transport } from '../models/transport';
import { ExternalDataError } from '../errors/ExternalDataError';

let cachedTransportData: Transport[] | null = null;

export async function fetchTransportData(): Promise<Transport[]> {
  try {
    if (cachedTransportData) return cachedTransportData;
    const response = await axios.get<Transport[]>(
      'https://frankvisuals.github.io/co2-data/transport.json'
    );
    cachedTransportData = response.data;
    return cachedTransportData;
  } catch (error) {
    console.error('Error fetching transport data:', error);
    throw new ExternalDataError('Failed to fetch transport data');
  }
}
