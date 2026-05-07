export const UserErrorCode = {
  UserAlreadyExists: 'USER_ALREADY_EXISTS',
} as const;

export type UserErrorCode = (typeof UserErrorCode)[keyof typeof UserErrorCode];
