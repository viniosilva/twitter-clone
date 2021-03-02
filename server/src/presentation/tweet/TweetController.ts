import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiTags,
} from '@nestjs/swagger';
import InvalidRequestException from '../../application/tweet/exception/InvalidRequestException';
import { CreateTweetRequest, CreateTweetResponse } from './dto/CreateTweetDto';
import TweetService from '../../application/tweet/TweetService';
import { authGuard } from '../auth';

@Controller('/api/tweets')
@UseGuards(authGuard)
@ApiTags('tweet')
@ApiBearerAuth('user')
@ApiInternalServerErrorResponse({ description: 'Internal server error' })
export default class TweetController {
  constructor(private readonly tweetService: TweetService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The tweet has been successfully created',
    type: CreateTweetRequest,
  })
  @ApiBadRequestResponse({ description: 'Invalid tweet to create' })
  async createTweet(
    @Req() req: Record<string, unknown>,
    @Body() request: CreateTweetRequest,
  ): Promise<CreateTweetResponse> {
    try {
      const response = await this.tweetService.createTweet(
        String(req.userId),
        request,
      );

      return response;
    } catch (error) {
      if (error instanceof InvalidRequestException) {
        throw new BadRequestException(error.errors);
      }
      throw error;
    }
  }

  @Delete('/:tweetId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    description: 'The tweet has been successfully removed',
  })
  async removeTweet(
    @Req() req: Record<string, unknown>,
    @Param('tweetId') tweetId: number,
  ): Promise<void> {
    await this.tweetService.removeTweet(String(req.userId), Number(tweetId));
  }
}
