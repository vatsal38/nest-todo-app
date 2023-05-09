import { SetMetadata, applyDecorators } from '@nestjs/common';

export const Permissions = (...permissions: string[]) =>
  applyDecorators(SetMetadata('permissions', permissions));
