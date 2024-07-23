import { getTokenRepo } from 'shared/database/repository/auth/get-token-repo';
import { compareAsc } from 'date-fns';
import { updateExpiredRepo } from 'shared/database/repository/auth/update-expired-repo';
import { deleteExpiredRepo } from 'shared/database/repository/auth/delete-expired-repo';

export const isAccessTokenValid = async (token: string, email: string): Promise<boolean> => {
  const tokenRecord = await getTokenRepo(token, email);

  if (!tokenRecord) {
    return false;
  }

  const currentDate = new Date();

  const comparisonResult = compareAsc(currentDate, tokenRecord.expiredAt);

  if (comparisonResult >= 0) {
    deleteExpiredRepo(token, email);
    return false;
  }

  const expiredDateMinus15Days = new Date(tokenRecord.expiredAt);
  expiredDateMinus15Days.setDate(expiredDateMinus15Days.getDate() - 15);

  const isRefreshToken = compareAsc(currentDate, expiredDateMinus15Days);

  if (isRefreshToken >= 0) {
    const newExpired = new Date(tokenRecord.expiredAt);
    newExpired.setDate(newExpired.getDate() + 15);
    updateExpiredRepo(token, email, newExpired);
  }

  return true;
};
