import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class LoginDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
