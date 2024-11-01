// import { AuthService } from './auth.service';
// import { AuthGuard } from './auth.guard';
// import { Controller, Get, Post, UseGuards } from '@nestjs/common';

// @Controller('auth')
// export class AuthController {
//     constructor(private authService: AuthService) { }

//     @Post()
//     login(@Body() body) {
//         return this.authService.login(body.email, body.password);
//     }

//     @UseGuards(AuthGuard)
//     @Get()
//     protected() {
//         return { name: 'ok' };
//     }
// }
