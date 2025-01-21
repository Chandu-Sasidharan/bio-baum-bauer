import { pick } from 'lodash-es';

export default function pickUserPayload(user) {
  return pick(user, [
    'id',
    'firstName',
    'lastName',
    'address',
    'email',
    'phoneNumber',
    'avatarUrl',
    'isAdmin',
    'isSuperAdmin',
    'deletedAt',
  ]);
}
