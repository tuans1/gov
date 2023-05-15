import loginService from "./User/loginService";
import userManagementService from "./Admin/userManagementService";
import addFileService from "./Admin/addFileService";
const apiService = {
  ...loginService,
  ...userManagementService,
  ...addFileService
};

export default apiService;
