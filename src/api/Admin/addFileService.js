import axios from "axios";
const PREFIX = "http://document-manager.herokuapp.com/api/v1";
const URIS = {
  LIST_FILE: `${PREFIX}/get-file?`,
  ASSIGN_USER: `${PREFIX}/file/assign`,
  IMPORT_FILE: `${PREFIX}/import-file-zip`,
  DELETE_ASSIGNEE: `${PREFIX}/file/remove-assign`,
  DELETE_FILE: `${PREFIX}/remove-file`,
};

export default {
  assignUser(data) {
    return axios.post(URIS.ASSIGN_USER, data).then((res) => {
      console.log(res);
      return res;
    });
  },
  importFile(data) {
    return axios.post(URIS.IMPORT_FILE, data).then((res) => {
      console.log(res);
      return res;
    });
  },
  deleteFile(data) {
    return axios.post(URIS.DELETE_FILE, data).then((res) => {
      return res;
    });
  },
  getListFile(data) {
    return axios
      .get(URIS.LIST_FILE + new URLSearchParams(data))
      .then((res) => res);
  },
  deleteAssignee(data) {
    return axios.post(URIS.DELETE_ASSIGNEE, data).then((res) => {
      return res;
    });
  },
};
