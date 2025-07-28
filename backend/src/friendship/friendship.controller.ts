import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import { FriendshipService } from './friendship.service';
import { CreateFriendshipDto } from './dto/create-friendship.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('friendship')
@UseGuards(AuthGuard)
export class FriendshipController {
  constructor(private readonly friendshipService: FriendshipService) {}

  @Post('requests')
  create(@Body() createFriendshipDto: CreateFriendshipDto, @Req() req: any) {
    return this.friendshipService.create(createFriendshipDto, req.user.id);
  }

  @Get('requests/received')
  async findReceivedRequests(@Req() req: any) {
    return await this.friendshipService.findByAllPendingUser(req.user.id);
  }
}
