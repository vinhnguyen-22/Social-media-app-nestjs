import { ForbiddenException, Injectable } from '@nestjs/common';
import * as agron from 'argon2';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthDto, RegisterDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async register(registerDto: RegisterDto) {
    const { email, password, firstName, lastName, address, phoneNumber } =
      registerDto;

    const hashedPassword = await agron.hash(password);

    try {
      const user = await this.prismaService.user.create({
        data: {
          email,
          hashedPassword,
          firstName,
          lastName,
          phoneNumber,
          address,
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          address: true,
        },
      });
      return user;
    } catch (error) {
      if (error.code == 'P2002') {
        throw new ForbiddenException('User with this email already exists');
      }
    }
  }

  async login(authDto: AuthDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: authDto.email,
      },
    });

    if (!user) throw new ForbiddenException('User not found');
    const passwordMatched = await agron.verify(
      user.hashedPassword,
      authDto.password,
    );

    if (!passwordMatched) throw new ForbiddenException('Incorrect Password');

    delete user.hashedPassword; // remove 1 field in the object
    // it doesn't affect to the database
    return user;
  }
}
