import getAllNotificationsByUser from './notifications';
import { notification } from './notifications';
import { normalize } from "normalizr";
import * as notificationData from "../../notifications.json";

describe('notification schema', () => {
    test('uses the id 5debd764a7c57c7839d722e9 and verifies that the following data is returned:', () => {
        const result =
            [
                {
                    guid: "2d8e40be-1c78-4de0-afc9-fcc147afd4d2",
                    isRead: true,
                    type: "urgent",
                    value:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
                },
                {
                    guid: "280913fe-38dd-4abd-8ab6-acdb4105f922",
                    isRead: false,
                    type: "urgent",
                    value:
                        "Non diam phasellus vestibulum lorem sed risus ultricies. Tellus mauris a diam maecenas sed"
                }
            ], context = getAllNotificationsByUser("5debd764a7c57c7839d722e9");
        expect(context).toEqual(expect.arrayContaining(result));
    });

    test('should return correct result array after normalization', () => {

        const expectedResult = [
            "5debd76480edafc8af244228",
            "5debd764507712e7a1307303",
            "5debd76444dd4dafea89d53b",
            "5debd76485ee4dfd1284f97b",
            "5debd7644e561e022d66e61a",
            "5debd7644aaed86c97bf9d5e",
            "5debd76413f0d5e5429c28a0",
            "5debd7642e815cd350407777",
            "5debd764c1127bc5a490a4d0",
            "5debd7646ef31e0861ec1cab",
            "5debd764a4f11eabef05a81d",
            "5debd764af0fdd1fc815ad9b",
            "5debd76468cb5b277fd125f4",
            "5debd764de9fa684468cdc0b"
        ];

        const normalizedData = normalize(notificationData, [notification]);

        expect(normalizedData.result).toEqual(expectedResult);
    });

    test('should return correct users entity', () => {
        const normalizedData = normalize(notificationData, [notification]);

        const userId = "5debd764a7c57c7839d722e9";
        const expectedUser = {
            age: 25,
            email: "poole.sanders@holberton.nz",
            id: "5debd764a7c57c7839d722e9",
            name: { first: "Poole", last: "Sanders" },
            picture: "http://placehold.it/32x32",
        };

        const user = normalizedData.entities.users[userId];

        expect(user).toEqual(expectedUser);
    });

    test('should return correct messages entity', () => {
        const normalizedData = normalize(notificationData, [notification]);

        const messageGuid = "efb6c485-00f7-4fdf-97cc-5e12d14d6c41";
        const expectedMessage = {
            guid: "efb6c485-00f7-4fdf-97cc-5e12d14d6c41",
            isRead: false,
            type: "default",
            value: "Cursus risus at ultrices mi.",
        };

        const message = normalizedData.entities.messages[messageGuid];

        expect(message).toEqual(expectedMessage);
    });

    test("should return correct notifications entity", () => {
        const normalizedData = normalize(notificationData, [notification]);

        const notificationId = "5debd7642e815cd350407777"; // Notification ID to test
        const expectedNotification = {
            author: "5debd764f8452ef92346c772",
            context: "3068c575-d619-40af-bf12-dece1ee18dd3",
            id: "5debd7642e815cd350407777",
        };

        // Access the notification entity in the normalized data
        const notificationEntity = normalizedData.entities.notifications[notificationId];

        // Assert that the notification entity matches the expected data
        expect(notificationEntity).toEqual(expectedNotification);
    });

})