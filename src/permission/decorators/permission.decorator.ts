import { SetMetadata, applyDecorators } from '@nestjs/common';

export const Permissions = (...permissions: string[]) => {
  return applyDecorators(SetMetadata('permissions', permissions));
};
