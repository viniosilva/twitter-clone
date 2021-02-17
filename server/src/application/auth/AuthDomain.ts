import { validateSync } from 'class-validator';
import InvalidRequestException from './exception/InvalidRequestException';

export default class AuthDomain {
  validateRequest(request: Object): void {
    const validationErrors = validateSync(request);

    if (validationErrors.length > 0) {
      const errors = validationErrors.map((error) =>
        Object.values(error.constraints),
      );
      throw new InvalidRequestException([].concat(...errors));
    }
  }
}
