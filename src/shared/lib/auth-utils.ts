import { AuthUser } from '../types/auth';

const BASE_URL = process.env.API_BASE_URL;
const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID;

/**
 * 백엔드에서 현재 사용자 정보를 조회합니다.
 */
export async function fetchUserInfo(accessToken: string): Promise<AuthUser> {
  const response = await fetch(`${BASE_URL}/${TEAM_ID}/users/me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user info');
  }

  return response.json();
}
