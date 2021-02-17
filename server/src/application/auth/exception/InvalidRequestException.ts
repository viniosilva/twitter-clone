export default class InvalidRequestException extends Error {
  constructor(readonly errors: string[]) {
    super('Invalid request');
  }
}
