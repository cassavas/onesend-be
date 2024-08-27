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
    id: number;
    publicId: string;
    name: string;
    sid: string;
    authId: string;
    balance: number;
    smsCommited: number;
    emailCommited: number;
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
        id: true,
        publicId: true,
        name: true,
        sid: true,
        authId: true,
        balance: true,
        smsCommited: true,
        emailCommited: true,
        Plan: {
          select: {
            publicId: true,
            name: true
          }
        }
      }
    });
  }

  public async getProjectById(id: number): Promise<{
    publicId: string;
    name: string;
    sid: string;
    authId: string;
    balance: number;
    smsCommited: number;
    emailCommited: number;
    Plan: {
      publicId: string;
      name: string;
    };
  } | null> {
    return global.prisma.project.findUnique({
      where: {
        id
      },
      select: {
        publicId: true,
        name: true,
        sid: true,
        authId: true,
        balance: true,
        smsCommited: true,
        emailCommited: true,
        Plan: {
          select: {
            publicId: true,
            name: true
          }
        }
      }
    });
  }

  public async processDebitBalance(projectId: number, amount: number): Promise<void> {
    await global.prisma.project.update({
      where: { id: projectId },
      data: {
        balance: {
          decrement: amount
        }
      }
    });
  }

  public async processDecreaseSmsCommited(projectId: number) {
    await global.prisma.project.update({
      where: { id: projectId },
      data: {
        smsCommited: {
          decrement: 1
        }
      }
    });
  }

  public async getSmsServiceFree(alpha3: string, carrier: string) {
    return global.prisma.pricing.findFirst({ where: { countryCode: alpha3, carrierName: carrier } });
  }
}

export default new ProjectRepository();
