export class InvalidFootprintError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidFootprintError';
  }
}
