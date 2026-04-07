export interface AuthUser {
  id: number;
  email: string;
  name: string;
  teamId?: string;
  companyName?: string;
  image?: string | null;
}
