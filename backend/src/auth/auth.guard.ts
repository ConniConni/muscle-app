import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // HTTPリクエストオブジェクト取得
    const request = context.switchToHttp().getRequest();
    // リクエストヘッダーからJWTトークンを取り出す
    const token = this.extractTokenFromHeader(request);
    // JWTトークンが取り出せない場合、例外処理
    if (!token) {
      throw new UnauthorizedException();
    }
    // JWTトークンを検証
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  // JWTトークンをAuthorizationヘッダーにセット
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
