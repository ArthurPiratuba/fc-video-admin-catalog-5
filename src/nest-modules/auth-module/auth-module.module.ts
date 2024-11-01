import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Global()
@Module({
    imports: [
        // JwtModule.register({
        //   //global: true
        //   secret: '123456',
        //   signOptions: { expiresIn: '60s' },
        // }),
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => {
                return {
                    privateKey: configService.get('JWT_PRIVATE_KEY'),
                    publicKey: configService.get('JWT_PUBLIC_KEY'),
                    signOptions: {
                        algorithm: 'RS256',
                    } as any,
                };
            },
            inject: [ConfigService],
            global: true,
        }),
    ],
    controllers: [
        //AuthController
    ],
    providers: [AuthService, AuthGuard],
})
export class AuthModule { }
