import { BcryptHashProvider } from "../../infrastructure/security/hash-provider"
import { JwtProvider } from "../../infrastructure/security/jwt-provider"

export class SecurityFactory {
  static createHashProvider() {
    return new BcryptHashProvider()
  }

  static createJwtProvider() {
    return new JwtProvider()
  }
}
