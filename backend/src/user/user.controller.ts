import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Get,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-up')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('search')
  async searchUsers(@Query('q') query: string, @Req() req: any) {
    const currentUserId = req.user.id;
    return this.userService.searchUsersByQuery(query, currentUserId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Get('by-userid/:userId')
  findUserId(@Param('userId') userId: string) {
    return this.userService.findByUserId(userId);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
