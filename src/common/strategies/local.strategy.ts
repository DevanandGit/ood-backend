import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  validate(...args: any[]): unknown {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  // async validate(email: string, password: string): Promise<any> {
  //   const user = await this.authService.login(email, password);

  //   if (!user) {
  //     throw new UnauthorizedException('Invalid credentials');
  //   }

  //   return user;
  // }
}
