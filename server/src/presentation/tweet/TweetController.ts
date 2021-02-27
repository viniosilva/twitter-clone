import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
} from '@nestjs/swagger';
import InvalidRequestException from '../../application/tweet/exception/InvalidRequestException';
import { CreateTweetRequest } from '../../application/tweet/dto/CreateTweetDto';
import { CreateTweetResponse } from './dto/CreateTweetDto';
import TweetService from '../../application/tweet/TweetService';
import { authGuard } from '../auth';
import { Response } from 'express';

@Controller('/api/tweets')
@UseGuards(authGuard)
@ApiTags('tweet')
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
}
