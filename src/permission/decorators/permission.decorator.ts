import { SetMetadata, applyDecorators } from '@nestjs/common';

export const Permissions = (...permissions: string[]): ClassDecorator | any =>
  applyDecorators(SetMetadata('permissions', permissions));
