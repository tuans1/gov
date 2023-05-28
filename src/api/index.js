import loginService from "./User/loginService";
import userManagementService from "./Admin/userManagementService";
import addFileService from "./Admin/addFileService";
import addDocument from "./User/addDocumentService";
const apiService = {
  ...loginService,
  ...userManagementService,
  ...addFileService,
  ...addDocument,
};
export default apiService;
