import loginService from "./User/loginService";
import userManagementService from "./Admin/userManagementService";
import addFileService from "./Admin/addFileService";
import addDocument from "./User/addDocumentService";
import statisticService from "./Admin/statisticService";
const apiService = {
  ...loginService,
  ...userManagementService,
  ...addFileService,
  ...addDocument,
  ...statisticService,
};
export default apiService;
