import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(username);
    console.log('validate user ' + user);
    const crypt = await bcrypt.compare(pass, user.password);
    console.log('compare crypt ' + crypt);
    if (crypt) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { id: user._doc._id, email: user._doc.email };
    const userId = user._doc._id;
    const username = user._doc.username;
    const role = user._doc.role;
    console.log(payload);
    return {
      access_token: this.jwtService.sign(payload),
      userId,
      username,
      role,
    };
  }
}
