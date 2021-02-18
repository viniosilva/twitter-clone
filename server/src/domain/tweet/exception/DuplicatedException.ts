export default class DuplicatedException extends Error {
  constructor() {
    super('User already exists');
  }
}
