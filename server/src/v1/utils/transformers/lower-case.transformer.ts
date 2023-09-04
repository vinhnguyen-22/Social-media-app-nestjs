import { TransformFnParams } from 'class-transformer';

export const lowerCaseTransformer = (
  params: TransformFnParams,
): string | undefined => params.value?.toLowerCase().trim();
