import { Injectable } from '@nestjs/common';
import { CreateFriendshipDto } from './dto/create-friendship.dto';

@Injectable()
export class FriendshipService {
  create(createFriendshipDto: CreateFriendshipDto) {
    return 'This action adds a new friendship';
  }
}
