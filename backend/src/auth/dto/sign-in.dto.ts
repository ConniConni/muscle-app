import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8) // パスワードは8文字以上
  @MaxLength(64) // 64文字以下
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9]+$/) //英大文字・英小文字・数字をすべて1文字以上含み、英数字のみであること
  password: string;
}
