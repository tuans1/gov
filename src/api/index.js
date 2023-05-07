import loginService from "./User/loginService";
import userManagementService from "./Admin/userManagementService";
const apiService = {
  ...loginService,
  ...userManagementService,
};

export default apiService;
