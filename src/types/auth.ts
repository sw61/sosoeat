export interface AuthUser {
  id: string;
  name: string;
  email?: string;
  image?: string;
  /**
   * Temporary compatibility field for older mocks/stories.
   * New auth data should use `image`.
   */
  profileImage?: string;
}
