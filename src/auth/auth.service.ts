import {
  BadRequestException,
  Injectable
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
    
  ) {}

  async returnToken(login) {
    const payload = { login: login };
    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '24h' }),
    };
  }
  
  async login({ login, password }: LoginDto) {
    const exists = await this.prisma.login.findFirst({
      where: { login: login },
    });
    if (!exists) throw new BadRequestException('Wrong credentials');

    if (bcrypt.compareSync(password, exists.password)) {
      return this.returnToken(exists.login);
    }

    throw new BadRequestException('Wrong credentials');
  }

  async createLogin(body: LoginDto) {
    const passwordHash = bcrypt.hashSync(body.password, bcrypt.genSaltSync()); 
    return await this.prisma.login.create({ data: {login:body.login, password:passwordHash} });
  }

}
