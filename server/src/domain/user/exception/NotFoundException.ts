export default class NotFoundException extends Error {
  constructor() {
    super('User not found');
  }
}
