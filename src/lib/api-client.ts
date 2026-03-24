import { AuthApi } from '@/types/generated-client/apis/AuthApi';
import { MeetingsApi } from '@/types/generated-client/apis/MeetingsApi';
import { UsersApi } from '@/types/generated-client/apis/UsersApi';
import { Configuration } from '@/types/generated-client/runtime';

/**
 * API Base URL 설정
 * - 개발: http://localhost:3000/api (Next.js API Routes)
 * - 프로덕션: 실제 백엔드 서버 URL
 */
const API_BASE_PATH = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://dallaem-backend.vercel.app';

const apiConfig = new Configuration({
  basePath: API_BASE_PATH,
});

// 각 Api 클래스에 같은 설정을 넘긴다
export const authApi = new AuthApi(apiConfig);
export const meetingsApi = new MeetingsApi(apiConfig);
export const usersApi = new UsersApi(apiConfig);
