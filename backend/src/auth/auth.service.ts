import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'; // bcryptはCommonJS形式のパッケージのため名前空間インポート

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<{ access_token: string }> {
    const { userId, password: inputPassword } = signInDto;
    const user = await this.userService.findByUserId(userId);
    // userがnull または inputPasswordがハッシュ化したパスワードと一致しない場合（認証失敗）401エラーを投げる
    if (!user || !bcrypt.compare(inputPassword, user.password)) {
      throw new UnauthorizedException();
    }
    // 認証に成功すれば、JWTのペイロードにユーザーのIDとユーザー名を格納する
    const payload = { sub: user.id, username: user.username };
    // メモ 戻り値：
    // "①Base64URLエンコードされたヘッダー".
    // "②Base64URLエンコードされたペイロード".
    // "①と②をドットで結合した文字列に秘密鍵やアルゴリズムで署名を生成し、Base64URLエンコードしたもの"
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
