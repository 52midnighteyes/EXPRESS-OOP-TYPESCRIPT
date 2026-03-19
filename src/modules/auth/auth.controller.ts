import { type Response, type Request, type NextFunction } from "express";
import type { ILoginParams, IRegisterParams } from "./auth.interface.js";
import { authService } from "./auth.service.js";
import { NODE_ENV } from "../../config/config.js";
import { AppError } from "../../class/appError.js";

class AuthController {
  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = req.validated!.body as IRegisterParams;
      const data = await authService.Register(payload);
      res.status(201).json({
        message: "User registered successfully",
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = req.validated!.body as ILoginParams;
      const {
        cookie: { refreshToken, maxAge },
        data,
      } = await authService.Login(payload);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: NODE_ENV === "production",
        sameSite: "none",
        maxAge,
        path: "/api/auth",
      });

      res.status(201).json({ message: "Login Success!", data });
    } catch (error) {
      next(error);
    }
  };

  public refreshToken = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const refToken = req.cookies.refreshToken;
      const {
        cookie: { refreshToken, maxAge },
        data,
      } = await authService.refreshToken(refToken);

      if (!refreshToken) {
        throw new AppError(401, "Refresh token is required");
      }

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: NODE_ENV === "production",
        sameSite: "none",
        maxAge,
        path: "/api/auth",
      });

      res.status(200).json({ message: "Token refreshed successfully", data });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refToken = req.cookies?.refreshToken;

      if (refToken) {
        await authService.logOut(refToken);
      }

      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: NODE_ENV === "production",
        sameSite: NODE_ENV === "production" ? "none" : "lax",
        path: "/api/auth",
      });

      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      next(error);
    }
  };
}

export const authController = new AuthController();
