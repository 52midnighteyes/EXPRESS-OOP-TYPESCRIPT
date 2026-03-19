import {
  JWT_SECRET,
  NODE_ENV,
  REFRESH_TOKEN_SECRET,
} from "../../config/config.js";
import { createHmac, randomBytes } from "node:crypto";
import type { IUserParams } from "../../custom.js";
import Jwt from "jsonwebtoken";

export class AuthHelper {
  public static generateRefreshToken = () => {
    const refreshToken = randomBytes(32).toString("hex");
    const hashedToken = createHmac("sha256", REFRESH_TOKEN_SECRET)
      .update(refreshToken)
      .digest("hex");

    return { refreshToken, hashedToken };
  };

  public static generateAccessToken = (params: IUserParams) => {
    const accessToken = Jwt.sign(params, JWT_SECRET, {
      expiresIn: NODE_ENV === "production" ? "1h" : "24h",
    });

    return accessToken;
  };

  public static tokenHasher = (token: string) => {
    return createHmac("sha256", REFRESH_TOKEN_SECRET)
      .update(token)
      .digest("hex");
  };
}
