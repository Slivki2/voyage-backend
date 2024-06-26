import { Injectable, Logger } from "@nestjs/common"
import { AwsCognitoService } from "../aws-cognito/aws-cognito.service"
import { AuthLoginUserDto } from "./dto/auth-login-user.dto"
import { AuthRegisterUserConfirmDto } from "./dto/auth-register-user-confirm.dto"
import { AuthRegisterUserResendConfirmDto } from "./dto/auth-register-user-resend-confirm.dto"
import { AuthRegisterUserDto } from "./dto/auth-register-user.dto"
import { AuthSignUpResendConfirmationDto } from "./dto/auth-sign-up-resend-confirmation.dto"
import { AuthSignUpResultDto } from "./dto/auth-sign-up-result.dto"
import { AuthSignUpConfirmedDto } from "./dto/auth-sign-up-confirmed.dto"

@Injectable()
export class AuthService {
  constructor(
    private readonly awsCognitoService: AwsCognitoService,
    private readonly logger: Logger,
  ) {}

  async signIn(loginUserDto: AuthLoginUserDto) {
    try {
      this.logger.log("Signing in user")
      const { username, accessToken, refreshToken } = await this.awsCognitoService.signIn(loginUserDto)

      return { username: username, accessToken: accessToken, refreshToken: refreshToken }
    } catch (error) {
      this.logger.error("Error while signing in user", error)

      throw error
    }
  }

  async signUp(singupUserDto: AuthRegisterUserDto): Promise<AuthSignUpResultDto> {
    try {
      this.logger.log("Signing up user")
      const { username } = await this.awsCognitoService.signUp(singupUserDto)

      return { email: null, username: username }
    } catch (error) {
      this.logger.error("Error while signing up user", error)

      throw error
    }
  }

  async signUpConfirm(signUpConfirmDto: AuthRegisterUserConfirmDto): Promise<AuthSignUpConfirmedDto> {
    try {
      this.logger.log("Confirming sign up")

      const result = await this.awsCognitoService.signUpConfirm(signUpConfirmDto)

      return {
        confirmed: result,
      }
    } catch (error) {
      this.logger.error("Error while confirming sign up", error)

      throw error
    }
  }

  async resendConfirmationCode(
    signUpResendConfirmationDto: AuthRegisterUserResendConfirmDto,
  ): Promise<AuthSignUpResendConfirmationDto> {
    try {
      this.logger.log("Resending confirmation code")

      const result = await this.awsCognitoService.resendConfirmationCode(signUpResendConfirmationDto.username)

      return {
        sent: result,
      }
    } catch (error) {
      this.logger.error("Error while resending confirmation code", error)

      throw error
    }
  }
}
