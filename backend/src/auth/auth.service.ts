import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signIn(signInDto: SignInDto): Promise<any> {
    const { userId, password: inputPassword } = signInDto;
    const user = await this.userService.findByUserId(userId);
    if (user?.password !== inputPassword) {
      throw new UnauthorizedException();
    }
    // オブジェクトの分割代入で、userからpasswordを除いた残りの情報をresultに格納
    const { password, ...result } = user;
    // TODO: JWTを生成して返却する形に修正 現在はユーザー情報をオブジェクトで返却
    return result;
  }
}
