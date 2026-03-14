import type { IRegisterParams } from "./auth.interface.js";
import { authRepo } from "./auth.repository.js";
import { AppError } from "../../class/appError.js";
import { userRepo } from "../user/user.repository.js";
import argon2d from "argon2";

class AuthService {
  public userRegister = async (params: IRegisterParams) => {
    try {
      const user = await userRepo.findUserByEmail(params.email);
      if (user) throw new AppError(409, "Email is already registered");

      const hashedPassword = await argon2d.hash(params.password);
      const payload = { ...params, password: hashedPassword };

      const safeUser = await authRepo.createUser(payload);

      return safeUser;
    } catch (error) {
      console.error("message:", error);
      throw error;
    }
  };
}

export const authService = new AuthService();
