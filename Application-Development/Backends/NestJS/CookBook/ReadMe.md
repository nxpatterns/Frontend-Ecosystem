# NestJS Cookbook

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Authentication / Authorization](#authentication--authorization)
  - [Common Authentication Methods](#common-authentication-methods)
    - [Basic](#basic)
    - [Bearer](#bearer)
    - [CAS](#cas)
    - [Digest](#digest)
    - [JWT](#jwt)
    - [LDAP](#ldap)
    - [NTLM](#ntlm)
    - [OAuth](#oauth)
    - [OpenID](#openid)
    - [Passport](#passport)
    - [SAML](#saml)
    - [Session](#session)
  - [Others](#others)
    - [500px](#500px)
    - [Apple](#apple)
    - [Auth0](#auth0)
    - [AWS](#aws)
    - [Azure Active Directory](#azure-active-directory)
    - [Bitbucket](#bitbucket)
    - [Cognito](#cognito)
    - [Discord](#discord)
    - [Discord](#discord-1)
    - [Dribbble](#dribbble)
    - [Dropbox](#dropbox)
    - [Facebook](#facebook)
    - [Firebase](#firebase)
    - [Foursquare](#foursquare)
    - [Github](#github)
    - [Gitlab](#gitlab)
    - [Gitter](#gitter)
    - [Goodreads](#goodreads)
    - [Google](#google)
    - [Imgur](#imgur)
    - [Instagram](#instagram)
    - [Kakao](#kakao)
    - [Line](#line)
    - [Mail.ru](#mailru)
    - [Medium](#medium)
    - [Mixer](#mixer)
    - [Odnoklassniki](#odnoklassniki)
    - [Okta](#okta)
    - [Pinterest](#pinterest)
    - [Reddit](#reddit)
    - [Reddit](#reddit-1)
    - [Salesforce](#salesforce)
    - [Shopify](#shopify)
    - [Slack](#slack)
    - [Snapchat](#snapchat)
    - [Spotify](#spotify)
    - [Strava](#strava)
    - [Trello](#trello)
    - [Tumblr](#tumblr)
    - [Twitch](#twitch)
    - [Twitch](#twitch-1)
    - [Twitter](#twitter)
    - [Untappd](#untappd)
    - [VK](#vk)
    - [VKontakte](#vkontakte)
    - [WeChat](#wechat)
    - [Yammer](#yammer)
    - [Yandex](#yandex)
    - [Yandex](#yandex-1)
    - [Zendesk](#zendesk)

<!-- /code_chunk_output -->

## Authentication / Authorization

- Authentication <https://docs.nestjs.com/security/authentication>
- Authorization <https://docs.nestjs.com/security/authorization>

**Authentication** is an essential part of most applications; it identifies users and helps to determine whether a user is permitted to perform actions on a given resource. Authentication is the process of verifying the identity of a user.

**Authorization** refers to the process that determines what a user is able to do. For example, an administrative user is allowed to create, edit, and delete posts. A non-administrative user is only authorized to read the posts. Authorization is orthogonal and independent from authentication. However, authorization requires an authentication mechanism.

### Common Authentication Methods

#### Basic

Basic Authentication Example

```typescript
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class BasicAuthGuard extends AuthGuard('basic') {}
```

In this example, the `BasicAuthGuard` class extends the `AuthGuard` class and passes the `basic` string to the `super()` method. This string corresponds to the name of the strategy that Passport should use. Passport will now attempt to authenticate the user using the `BasicStrategy` class:

```typescript
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(
      username,
      password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
```

The credentials will be verified by the `validate()` method. If the credentials are valid, the `validate()` method will return the user object. If the credentials are not valid, the `validate()` method will throw an `UnauthorizedException` exception. The `BasicStrategy` class is decorated with the `@Injectable()` decorator so that Nest can inject the `AuthService` class into the constructor. The `AuthService` class is responsible for validating the user credentials:

```typescript
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && bcrypt.compareSync(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
```

The `validateUser()` method will return the user object if the username and password are valid. If the username and password are not valid, the `validateUser()` method will return `null`.

The username and password can be stored in a database or in a configuration file. In this example, the username and password are stored in a configuration file:

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env',
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

```typescript
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { BasicStrategy } from './basic.strategy';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, BasicStrategy],
  exports: [AuthService],
})
export class AuthModule {}
```

```typescript
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
```

```typescript
import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { BasicAuthGuard } from './auth/basic-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return req.user;
  }

  @UseGuards(BasicAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
```

```typescript
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(
      username,
      password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
```

```typescript
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(
      username,
      password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
```

#### Bearer

#### CAS

#### Digest

#### JWT

#### LDAP

#### NTLM

#### OAuth

#### OpenID

#### Passport

#### SAML

#### Session

### Others

#### 500px

#### Apple

#### Auth0

Auth0 is an authentication broker that supports social identity providers as well as enterprise identity providers such as Active Directory, LDAP, Google Apps and Salesforce. Auth0 provides a platform to authenticate, authorize, and secure access for applications, devices, and users.

#### AWS

#### Azure Active Directory

#### Bitbucket

#### Cognito

#### Discord

#### Discord

#### Dribbble

#### Dropbox

#### Facebook

#### Firebase

#### Foursquare

#### Github

#### Gitlab

#### Gitter

#### Goodreads

#### Google

#### Imgur

#### Instagram

#### Kakao

#### Line

#### Mail.ru

#### Medium

#### Mixer

#### Odnoklassniki

#### Okta

#### Pinterest

#### Reddit

#### Reddit

#### Salesforce

#### Shopify

#### Slack

#### Snapchat

#### Spotify

#### Strava

#### Trello

#### Tumblr

#### Twitch

#### Twitch

#### Twitter

#### Untappd

#### VK

#### VKontakte

#### WeChat

#### Yammer

#### Yandex

#### Yandex

#### Zendesk
