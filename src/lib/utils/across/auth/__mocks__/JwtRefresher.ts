import { vi } from 'vitest';

export const JwtRefresher = {
    GetTokens: vi.fn().mockResolvedValue({
        access_token: 'existing_access_token',
        refresh_token: 'existing_refresh_token',
        refreshed: false,
    }),
    ExtractRefreshToken: vi.fn().mockReturnValue('new_refresh_token'),
};
