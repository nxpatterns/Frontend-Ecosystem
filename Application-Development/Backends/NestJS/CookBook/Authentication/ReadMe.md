# NestJS Authentication

## General Receipt

1. Install necessary dependencies.
1. Implement user model: email, password, etc, and some mock users.
1. Implement a `register route` that saves a new user's data.
   1. Do hash passwords before saving!
1. Implement a `login route` that
   1. validates user password,
   1. creates a JWT and sends that back.
1. Implement JWT middleware that
   1. checks the JWT token on each request and
   1. sets req.user.
1. Use the database for storing and retrieving user data.
1. Implement features like:
   1. password reset,
   1. email validation,
   1. 3rd party OAuth etc.

## Install Necessary Dependencies

```bash
npm i bcrypt jsonwebtoken
npm i @nestjs/jwt @nestjs/passport passport passport-jwt
npm i @nestjs/mongoose mongoose
npm i passport-local
npm i --save-dev @types/passport-local
npm i --save-dev @types/bcrypt
```

## Create `auth` and `users` modules

```bash
nx generate @nestjs/schematics:module --name=auth --project=<project-name>  # use the relative path to the project
nx generate @nestjs/schematics:module --name=users --project=<project-name> # use the relative path to the project
```

## Dummy User Credentials (BCrypt Hashed)

Use bcrypt to hash the password with typescript:

```ts
const bcrypt = require('bcrypt');
const saltRounds = 10;
const password = '<some-password>';
bcrypt.hash(password, saltRounds, function (err, hash) {
  console.log(hash);
});
```

## JWT Strategy

src/app/modules/auth/jwt.strategy.ts

```ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as bcrypt from 'bcrypt';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secretKey',
    });
  }

  async validate(payload: any) {
    const user = payload.username;

    /**
     * The hashed password of "<some-password>"
     */

    const hashedPassword =
      '$2b$10$JyHuo8t3.2cqxtmNeKyMk.Nb8qEc/z4NkrmmCEthJ.m03xxdFbgtu';

    const isMatch = await bcrypt.compare(
      payload.password,
      hashedPassword,
    );

    if (user !== '<some-user>' || !isMatch) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}
```

## Include Strategy in `auth.module.ts`

```ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EventBusModule } from '~/event-bus/event-bus.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [EventBusModule, PassportModule],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
```

## Check JWT on each request

main.ts

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
const cookieParser = require('cookie-parser');
import * as passport from 'passport';
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  const options = new DocumentBuilder()
    .setTitle('Some Middleware')
    .setDescription('The Some Middleware API description')
    .setVersion('1.0')
    .addTag('some-middleware')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  /**
   * Initialize Passport and restore authentication state,
   * if any, from the session.
   */

  app.use(passport.initialize());
  app.use(passport.session());
  passport.useAuthGuard(JwtAuthGuard);
  await app.listen(3000);
}
bootstrap();
```

## Create a JwtAuthGuard

src/app/modules/auth/jwt-auth.guard.ts

```ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info) {
    if (err || !user) {
      throw (
        err ||
        new UnauthorizedException('You need to log in first.')
      );
    }
    return user;
  }
}
```

## User Service

src/app/modules/users/users.service.ts

```ts
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(private jwtService: JwtService) {}

  async authenticateUser(username: string, password: string) {
    const user = '<some-user-name>';

    /**
     * The hashed password of "<some-password>"
     */

    const hashedPassword =
      '$2b$10$JyHuo8t3.2cqxtmNeKyMk.Nb8qEc/z4NkrmmCEthJ.m03xxdFbgtu';
    const isMatch = await bcrypt.compare(password, hashedPassword);

    if (user !== username || !isMatch) {
      return null;
    }

    const payload = { username: user };
    return this.jwtService.sign(payload);
  }
}
```

## User Controller

src/app/modules/users/users.controller.ts

```ts
import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signin')
  async signin(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return this.usersService.authenticateUser(username, password);
  }
}
```

## Protect Routes

The jwt-auth.guard.ts can be used in any controller to protect routes as follows:

```ts
   @UseGuards(JwtAuthGuard)
   @Get('protected')
   getProtectedData() {
     return "secret data";
   }
```

## Test the API via Curl

```bash
curl -X POST -H "Content-Type: application/json" -d '{"username":"<some-user-name>","password":"<some-password>"}' http://localhost:3000/api/users/signin
```

## DB Setup

### Case: MongoDB is preinstalled

We can use the default MongoDB installation and need:

- Database host (hostname, port)
- Database name
- Connection user
- Connection password

### Case: MongoDB is not preinstalled

We can use a docker container and need:

- Database host (hostname, port)
- Database name
- Connection user
- Connection password

```bash
docker run --name mongodb -p 27017:27017 -d mongo
```
