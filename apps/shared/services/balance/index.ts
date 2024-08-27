import { LogError } from 'shared/error/logError';
import { ErrorVars } from 'shared/error/errorVars';
import ProjectRepository from 'shared/database/repository/project';

class BalanceService {
  public checkProjectBalance = async (projectId: number): Promise<number> => {
    const project = await ProjectRepository.getProjectById(projectId);

    if (!project) {
      throw new LogError(ErrorVars.E014_RESOURCE_NOT_FOUND, 'LOGIC');
    }

    return project.balance;
  };

  public processBalanceDebit = async (projectId: number, amount: number) => {
    global.prisma.project.update({ where: { id: projectId }, data: {} });
  };
}

export default new BalanceService();
