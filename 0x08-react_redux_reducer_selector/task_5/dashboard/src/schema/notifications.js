import notificationData from '../../notifications.json';
import { normalize, schema } from "normalizr";

const user = new schema.Entity("users");
const message = new schema.Entity("messages", {}, { idAttribute: "guid" });
const notification = new schema.Entity("notifications", {
    author: user,
    context: message,
});
export { user, message, notification };
const normalized = normalize(notificationData, [notification]);

export default function getAllNotificationsByUser(userId) {
    const { notifications, messages } = normalized.entities;

    return Object.values(notifications)
        .filter((notification) => notification.author === userId)
        .map((notification) => messages[notification.context]);
}

export default function notificationsNormalizer(data) {
    return normalize(data, [notification]);
}

export { normalized };