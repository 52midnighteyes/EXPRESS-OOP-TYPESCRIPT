import { prisma as db } from "../../libs/prisma/prisma.lib.js";
import type { TPrisma } from "../../libs/prisma/prisma.types.js";

class UserRepository {
  prisma: TPrisma;

  constructor() {
    this.prisma = db;
  }

  public findUserByEmail = async (email: string) => {
    return await this.prisma.user.findUnique({
      where: {
        email,
        deletedAt: null,
      },
    });
  };

  public findUserById = async (id: string) => {
    return await this.prisma.user.findUnique({
      where: { id, deletedAt: null },
    });
  };
}

export const userRepo = new UserRepository();
