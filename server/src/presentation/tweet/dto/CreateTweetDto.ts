import { ApiProperty } from '@nestjs/swagger';
import {
  CreateTweetRequest as Request,
  CreateTweetResponse as Response,
} from '../../../application/tweet/dto/CreateTweetDto';

const tweetExample = 'I am a tweet! :)';

export class CreateTweetRequest implements Request {
  @ApiProperty({ example: tweetExample })
  content: string;
}

export class CreateTweetResponse implements Response {
  @ApiProperty({ example: tweetExample })
  content: string;

  @ApiProperty({ example: new Date() })
  createdAt: Date;
}
