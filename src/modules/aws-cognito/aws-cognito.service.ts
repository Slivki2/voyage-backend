import { Injectable, Logger } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool } from "amazon-cognito-identity-js"
import { EnvironmentConfig } from "../../config/env/env-configuration"
import { AwsCognitoSignInResultDto } from "./dto/aws-cognito-sign-in-result.dto"
import { AwsCognitoSignInDto } from "./dto/aws-cognito-sign-in.dto"
import { AwsCognitoSignUpDto } from "./dto/aws-cognito-sign-up.dto"
import { AwsCognitoUserDto } from "./dto/aws-cognito-user.dto"

@Injectable()
export class AwsCognitoService {
  private readonly cognitoUserPool: CognitoUserPool = new CognitoUserPool({
    UserPoolId: this.configService.get<EnvironmentConfig["awsCognito"]>("awsCognito").userPoolId,
    ClientId: this.configService.get<EnvironmentConfig["awsCognito"]>("awsCognito").clientId,
  })

  constructor(
    private readonly configService: ConfigService,
    private readonly logger: Logger,
  ) {}

  async signUp(signUpDto: AwsCognitoSignUpDto): Promise<AwsCognitoUserDto> {
    const { password, name, email } = signUpDto

    this.logger.log(`Signing up user with email: ${email}`)
    const requiredCognitoAttributes: CognitoUserAttribute[] = [
      new CognitoUserAttribute({
        Name: "name",
        Value: name,
      }),
    ]

    const validationData: CognitoUserAttribute[] | null = null

    return new Promise((resolve, reject) => {
      this.cognitoUserPool.signUp(email, password, requiredCognitoAttributes, validationData, (error, result) => {
        if (error || !result) {
          this.logger.error("Error while signing up user", error)

          reject(error)
        } else {
          this.logger.log("User has been signed up")

          const cognitoUserDto: AwsCognitoUserDto = {
            username: result.user.getUsername(),
          }

          resolve(cognitoUserDto)
        }
      })
    })
  }

  async signIn(signInDto: AwsCognitoSignInDto): Promise<AwsCognitoSignInResultDto> {
    const { password, email } = signInDto

    this.logger.log(`Signing in user with email: ${email}`)
    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    })

    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: this.cognitoUserPool,
    })

    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: result => {
          this.logger.log("User has been signed in")

          const signInResult: AwsCognitoSignInResultDto = {
            username: email,
            accessToken: result.getAccessToken().getJwtToken(),
            refreshToken: result.getRefreshToken().getToken(),
          }

          resolve(signInResult)
        },
        onFailure: error => {
          this.logger.error("Error while signing in user", error)

          reject(error)
        },
      })
    })
  }
}