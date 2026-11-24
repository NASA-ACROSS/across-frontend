import { type User } from '../../../../src/lib/types/User/User';
import dataBuilder from './dataBuilder';

export default dataBuilder<User>({
    id: 'user-1',
    first_name: 'Sandy',
    last_name: 'Cheeks',
    username: 'sandycheeks',
    email: 'sandy@treedome.space',
    rememberMe: false,
    groups: [],
    group_roles: [],
    received_invites: [],
});
