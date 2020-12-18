import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService
  ) {}

  @ApiBearerAuth()
  @ApiResponse({ status: 201})
  @ApiQuery({
    name: 'username',
    required: true,
    type: String,
  })
  @ApiQuery({
    name: 'password',
    required: true,
    type: String,
  })
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

}