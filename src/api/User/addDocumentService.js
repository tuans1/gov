import axios from "axios";
const PREFIX = "http://document-manager.herokuapp.com";
export default {
  saveDocument({ id, payload }) {
    return axios
      .post(PREFIX + `/api/v1/file/${id}/save`, payload)
      .then((res) => res);
  },
  confirmChecked(listId) {
    return axios
      .post(PREFIX + `/api/v1/file/confirm-checked`, listId)
      .then((res) => res);
  },
};
