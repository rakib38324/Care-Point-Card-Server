import catchAsync from '../../utils/catchAsync';
import commonRes from '../../utils/commonResponse';
import httpStatus from 'http-status-codes';
import { memberServices } from './memberApplications.service';

const createMembers = catchAsync(async (req, res) => {
  const result = await memberServices.createMemberIntoDB(req.user, req.body);

  commonRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Member Application Send Successfull.',
    data: result,
  });
});

export const memberControllers = {
  createMembers,
};
