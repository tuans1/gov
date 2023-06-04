import axios from "axios";
const PREFIX = "http://document-manager.herokuapp.com";
export default {
  exportDocument() {
    window.open(`http://document-manager.herokuapp.com/api/v1/export-file?userId=&pageNum=0&pageSize=10`);
  },
};
