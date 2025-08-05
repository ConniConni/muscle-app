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

  @Get()
  async fiendFriendsAll(@Req() req: any) {
    return await this.friendshipService.fiendFriendsAll(req.user.id);
  }

  @Get('requests/received')
  async findReceivedRequests(@Req() req: any) {
    return await this.friendshipService.findReceivedRequests(req.user.id);
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
