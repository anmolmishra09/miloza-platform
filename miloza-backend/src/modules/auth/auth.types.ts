
export interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: {
      id: number;
      email: string;
      role: string;
      status: string;
      profile: {
        fullName: string;
      };
    };
  };
}
