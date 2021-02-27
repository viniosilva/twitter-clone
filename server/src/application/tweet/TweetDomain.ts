import { validateSync } from 'class-validator';
import InvalidRequestException from './exception/InvalidRequestException';
import { ITweet } from 'src/domain/tweet/TweetSchema';

export default class TweetDomain {
  validateRequest(request: unknown): void {
    const validationErrors = validateSync(request);

    if (validationErrors.length > 0) {
      const errors = validationErrors.map((error) =>
        Object.values(error.constraints),
      );
      throw new InvalidRequestException([].concat(...errors));
    }
  }

  buildTweet(content: string): ITweet {
    return {
      _id: undefined,
      content,
      createdAt: new Date(),
      likes: [],
    };
  }
}
