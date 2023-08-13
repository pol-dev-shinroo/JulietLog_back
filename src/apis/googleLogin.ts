import axios from 'axios';
import qs from 'qs';
import { externalApiError } from '@/exceptions/index';

const googleLoginApi = async (code: string) => {
    console.log(code);
    const rootURl = 'https://oauth2.googleapis.com/token';
    const options = {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URL,
        grant_type: 'authorization_code',
    };
    try {
        const response = await axios.post(rootURl, qs.stringify(options), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        console.log(response);
        return response.data;
    } catch (err) {
        console.log(err);
        return externalApiError('Failed to fetch Google Oauth Tokens');
    }
};

export default googleLoginApi;
