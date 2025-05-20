import { fetchFootprintData } from '../clients/footprintClient';
import { fetchTransportData } from '../clients/transportClient';
import { InvalidFootprintError } from '../errors/InvalidFootprintError';
import { InvalidTransportationError } from '../errors/InvalidTransportationError';
import { Footprint } from '../models/footprint';
import { Transport } from '../models/transport';

export async function calculateFootprint(
  footprintIdentifier: string,
  transportIdentifier: string,
  targetCountry: string
): Promise<number> {
  const footprintData: Footprint[] = await fetchFootprintData();
  const transportData: Transport[] = await fetchTransportData();

  const footprint = footprintData.find(
    (f) => f.identifier === footprintIdentifier
  );
  if (!footprint) {
    throw new InvalidFootprintError('Invalid footprint or transport type');
  }
  const transport = transportData.find(
    (t) =>
      t.identifier === transportIdentifier &&
      t.target_country === targetCountry &&
      t.origin_country === footprint.country
  );

  if (!transport) {
    throw new InvalidTransportationError(
      'Invalid transport type or target country'
    );
  }

  return footprint.footprint_value * transport.factor;
}
