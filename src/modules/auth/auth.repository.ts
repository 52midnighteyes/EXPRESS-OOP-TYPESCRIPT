import { argon2id } from "argon2";
import { prisma as db } from "../../libs/prisma/prisma.lib.js";
import type { TPrisma } from "../../libs/prisma/prisma.types.js";
import type {
  ICreateRefreshTokenDbParams,
  IRegisterParams,
} from "./auth.interface.js";
import type { ICreateBlogDbParams } from "../blog/blog.interface.js";

class AuthRepository {
  prisma: TPrisma;
  constructor() {
    this.prisma = db;
  }

  public createUser = async (params: IRegisterParams) => {
    const user = await this.prisma.user.create({
      data: {
        ...params,
      },
      omit: {
        password: true,
        updatedAt: true,
        createdAt: true,
        deletedAt: true,
      },
    });

    return user;
  };

  public createRefreshToken = async (params: ICreateRefreshTokenDbParams) => {
    return await this.prisma.refreshToken.create({
      data: params,
    });
  };

  public findHashedToken = async (hashedToken: string) => {
    return await this.prisma.refreshToken.findUnique({
      where: { hashedToken, expiresAt: { gt: new Date() } },
    });
  };

  public rotateRefreshToken = async (
    oldHashedRefreshToken: string,
    newRefreshTokenData: ICreateRefreshTokenDbParams,
  ) => {
    await this.prisma.$transaction(async (tx) => {
      await tx.refreshToken.delete({
        where: {
          hashedToken: oldHashedRefreshToken,
        },
      });

      await tx.refreshToken.create({
        data: newRefreshTokenData,
      });
    });
  };

  public deleteRefreshTokenOnLogOut = async (hashedToken: string) => {
    return await this.prisma.refreshToken.deleteMany({
      where: {
        hashedToken,
      },
    });
  };
}

export const authRepo = new AuthRepository();
