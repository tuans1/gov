import { NotificationManager } from "react-notifications";

const createNotification = (type, msg) => {
  switch (type) {
    case "info":
      NotificationManager.info("Info message");
      break;
    case "success":
      console.log("OK");
      NotificationManager.success(msg);
      break;
    case "warning":
      NotificationManager.warning(msg, 5000);
      break;
    case "error":
      NotificationManager.error("Error message", "Click me!", 5000, () => {
        alert("callback");
      });
      break;
  }
};
export default createNotification;
