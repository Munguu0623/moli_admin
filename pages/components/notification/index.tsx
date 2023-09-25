import { notification } from "antd";

export function Notif(
  message: string,
  description: string,
  type: "success" | "info" | "warning" | "error"
) {
  return notification.open({
    message: message,
    description: description,
    type: type,
  });
}
