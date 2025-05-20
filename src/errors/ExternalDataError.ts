export class ExternalDataError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ExternalDataError';
  }
}
