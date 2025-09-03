import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Patch,
  ParseIntPipe,
  Param,
  Query,
} from '@nestjs/common';
import { FriendshipService } from './friendship.service';
import { CreateFriendshipDto } from './dto/create-friendship.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateFriendshipDto } from './dto/update-friendship.dto';

@Controller('friendship')
@UseGuards(AuthGuard)
export class FriendshipController {
  constructor(private readonly friendshipService: FriendshipService) {}

  @Post('requests')
  create(@Body() createFriendshipDto: CreateFriendshipDto, @Req() req: any) {
    return this.friendshipService.create(createFriendshipDto, req.user.id);
  }

  @Get('friends')
  async fiendFriendsAll(@Req() req: any) {
    return await this.friendshipService.findFriendsAll(req.user.id);
  }

  @Get('requests/received')
  async findReceivedRequests(@Req() req: any) {
    return await this.friendshipService.findReceivedRequests(req.user.id);
  }

  @Get(':approvalUserId')
  async findFriendshipStatus(
    @Param('approvalUserId', ParseIntPipe) approvalUserId: number,
    @Req() req: any,
  ) {
    const requesterUserId = req.user.id;
    return await this.friendshipService.findFriendshipStatus(
      approvalUserId,
      requesterUserId,
    );
  }

  @Get('id/:requestUserId')
  async findFriendshipStatusPK(
    @Param('requestUserId', ParseIntPipe) requestUserId: number,
    @Req() req: any,
  ) {
    const approvalUserId = req.user.id;
    return await this.friendshipService.findFriendshipStatusPK(
      requestUserId,
      approvalUserId,
    );
  }

  @Patch(':friendshipId')
  async update(
    @Param('friendshipId', ParseIntPipe) friendshipId: number,
    @Body() updateFriendshipDto: UpdateFriendshipDto,
    @Req() req: any,
  ) {
    return await this.friendshipService.updateRequestStatus(
      friendshipId,
      updateFriendshipDto.status,
      req.user.id,
    );
  }
}
