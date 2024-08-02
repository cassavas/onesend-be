import { Project } from 'shared/database/generated/prisma-client';
import { newAppId, newPublicId } from 'shared/helpers/function';
import { DEFAULT_PROJECT_BALANCE, FREE_PLAN_ID } from 'shared/types/const';

class ProjectRepository {
  public async listProject(userId: number): Promise<Project[]> {
    return global.prisma.project.findMany({ where: { userId: userId } });
  }

  public async createProject(userId: number, projectName: string): Promise<Project> {
    return global.prisma.project.create({
      data: {
        balance: DEFAULT_PROJECT_BALANCE,
        publicId: newPublicId(),
        planId: FREE_PLAN_ID,
        sid: newAppId(),
        authId: global._crypto.signProjectAuthToken(),
        name: projectName,
        userId: userId
      }
    });
  }

  public async getProject(
    userId: number,
    publicId: string
  ): Promise<{
    publicId: string;
    name: string;
    sid: string;
    authId: string;
    balance: number;
    Plan: {
      publicId: string;
      name: string;
    };
  } | null> {
    return global.prisma.project.findFirst({
      where: {
        publicId,
        User: {
          id: userId
        }
      },
      select: {
        publicId: true,
        name: true,
        sid: true,
        authId: true,
        balance: true,
        Plan: {
          select: {
            publicId: true,
            name: true
          }
        }
      }
    });
  }
}

export default new ProjectRepository();
