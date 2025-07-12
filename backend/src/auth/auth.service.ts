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
    // ユーザーが存在する場合のみ、パスワードを比較する
    const isPasswordMatching = user
      ? await bcrypt.compare(inputPassword, user.password)
      : false;

    // userがnull または inputPasswordがハッシュ化したパスワードと一致しない場合（認証失敗）401エラーを投げる
    if (!user || !isPasswordMatching) {
      throw new UnauthorizedException(
        'ユーザーIDまたはパスワードが正しくありません',
      );
    }

    // 認証に成功すれば、ヘッダーのAuthorizationフィールドで運ばれるJWTのペイロードにユーザーのIDとユーザー名を格納する
    // JWTの標準クレームに沿って sub にユーザーを一意に絞り込む user.idを格納
    // OIDCの標準クレームに沿って ユーザーのニックネームを preferred_username
    const payload = { sub: user.id, preferred_username: user.username };
    // メモ 戻り値：
    // "①Base64URLエンコードされたヘッダー".
    // "②Base64URLエンコードされたペイロード".
    // "①と②をドットで結合した文字列に秘密鍵やアルゴリズムで署名を生成し、Base64URLエンコードしたもの"
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
