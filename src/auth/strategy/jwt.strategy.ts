import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

interface IValidatePayload {
  email: string;
  role: string;
  id: string;
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'key',
    });
  }

  async validate(
    payload: IValidatePayload,
  ): Promise<{ email: string; role: string; id: string }> {
    return {
      email: payload.email,
      role: payload.role,
      id: payload.id,
    };
  }
}
