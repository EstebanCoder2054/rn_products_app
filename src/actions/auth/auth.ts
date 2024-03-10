// The actions are basically the http requests to gt to our backend
import { tesloApi } from '../../config/api/tesloApi';
import { User } from '../../domain/entities/user';
import type { AuthResponse } from '../../infrastructure/interfaces/auth.responses';

// This function is basically to map and give an specific format to the response
const returnUserToken = (data: AuthResponse) => {
  const user: User = {
    id: data.id,
    email: data.email,
    fullName: data.fullName,
    isActive: data.isActive,
    roles: data.roles,
  };

  return {
    user: user,
    token: data.token,
  };
};

export const authRegister = async (
  email: string,
  password: string,
  fullName: string,
) => {
  try {
    email = email.toLowerCase();
    const { data } = await tesloApi.post<AuthResponse>('/auth/register', {
      email,
      password,
      fullName,
    });
    return returnUserToken(data);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const authLogin = async (email: string, password: string) => {
  try {
    email = email.toLowerCase();
    const { data } = await tesloApi.post<AuthResponse>('/auth/login', {
      email,
      password,
    });

    return returnUserToken(data);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const authCheckStatus = async () => {
  try {
    const { data } = await tesloApi.get<AuthResponse>('/auth/check-status');
    return returnUserToken(data);
  } catch (error) {
    console.log(error);
    return null;
  }
};
