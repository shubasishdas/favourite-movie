import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CurrentUserDto } from './dto/currentUser.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register.dto';
import { Auth } from './entities/auth.entity';
import { UserEntity } from './entities/user.entity';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ type: Auth })
  login(@Body() { email, password }: LoginDto) {
    return this.authService.login(email, password);
  }

  @Post('register')
  @ApiOkResponse({ type: UserEntity })
  async register(@Body() registerUserDto: RegisterUserDto) {
    return new UserEntity(await this.authService.register(registerUserDto));
  }

  @Post('currentUser')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async currentUser(@Body() currentUserDto: CurrentUserDto) {
    return this.authService.getCurrentUser(currentUserDto);
  }
}
