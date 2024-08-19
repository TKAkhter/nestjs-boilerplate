import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/utils/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async createUser(@Body() body: { username: string; password: string }) {
    const { username, password } = body;
    return this.usersService.create(username, password);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllUsers() {
    return this.usersService.findAll();
  }

  @Get(':username')
  @UseGuards(JwtAuthGuard)
  async getUserByUsername(@Param('username') username: string) {
    return this.usersService.findOne(username);
  }
}