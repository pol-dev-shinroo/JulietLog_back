import { authRepository, usersRepository } from '@/repositories/index';
import { googleLoginApi } from '@/apis/index';
import { authHelperService } from './auth.service.helper';

type ExtendedUserGetInterface = UsersGetInterface & {
    tokenInfo: tokenInfo;
};

export const authService = {
    repository: authRepository,
    usersRepository: usersRepository,
    helperService: authHelperService,

    async localLogin(loginData: ExtendedUserGetInterface) {
        const { email, password } = loginData;

        // find user info
        const user = await this.helperService.findUser({ email, password });

        const auth = await this.repository.findAllTokensbyUserId(user.userId);

        // validate refreshToken
        const { refreshToken } = auth!;
        return this.helperService.handleTokenValidation(user, refreshToken);
    },

    async googleLogin(code: string) {
        return await googleLoginApi(code);
    },
};
