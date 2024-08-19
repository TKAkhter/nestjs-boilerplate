import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from 'src/utils/jwt.strategy';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtStrategy: JwtStrategy
  ) { }

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const { username, password } = body;
    const user = await this.jwtStrategy.validate({ username });
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return this.authService.login(username, password);
  }
}