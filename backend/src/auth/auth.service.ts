import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CurrentUserDto } from './dto/currentUser.dto';
import { RegisterUserDto } from './dto/register.dto';
import { Auth } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async login(email: string, password: string): Promise<Auth> {
    const user = await this.prisma.user.findUnique({ where: { email: email } });

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    const passwordValid = await compare(password, user.password);

    if (!passwordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return {
      createdAt: user.createdAt,
      id: user.id,
      name: user.name,
      email: user.email,
      token: this.jwtService.sign({ userId: user.id }),
    };
  }

  async register(registerUserDto: RegisterUserDto) {
    const userInDb = await this.prisma.user.findUnique({
      where: {
        email: registerUserDto.email,
      },
    });
    if (userInDb) {
      throw new ConflictException('Email already taken.');
    }

    const newUser = await this.prisma.user.create({
      data: {
        ...registerUserDto,
        password: await hash(registerUserDto.password, 10),
      },
    });

    return {
      id: newUser.id,
      createdAt: newUser.createdAt,
      name: newUser.name,
      email: newUser.email,
      token: this.jwtService.sign({ userId: newUser.id }),
    };
  }

  async getCurrentUser(currentUserDto: CurrentUserDto) {
    return await this.prisma.user.findUnique({
      where: { email: currentUserDto.email },
      include: {
        movies: {
          include: {
            movie: true,
          },
        },
      },
    });
  }

  validateUser(userId: string) {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }
}
