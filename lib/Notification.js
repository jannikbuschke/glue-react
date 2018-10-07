import * as tslib_1 from "tslib";
import { HubConnectionBuilder } from "@aspnet/signalr";
import { notification } from "antd";
import * as React from "react";
var openNotification = function (message) {
    if (message === void 0) { message = "This is the content of the notification. This is the content of the notification. This is the content of the notification."; }
    notification.open({
        description: message,
        message: "Notification Title"
    });
};
export var handleNotificationsAsync = function (baseUrl) {
    var connection = new HubConnectionBuilder()
        .withUrl(baseUrl + "/lobby")
        .build();
    connection.on("ReceiveMessage", function (message) {
        // tslint:disable-next-line:no-console
        console.log("received message", message);
        openNotification(message);
    });
    connection.on("Notification", function (n) {
        // tslint:disable-next-line:no-console
        console.log("notification", n);
        openNotification(n.message);
    });
    connection.start();
};
var Notification = /** @class */ (function (_super) {
    tslib_1.__extends(Notification, _super);
    function Notification() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Notification.prototype.render = function () {
        return null;
        // <React.Fragment>
        //   <Button
        //     // tslint:disable-next-line:jsx-no-lambda
        //     onClick={() => {
        //       openNotification();
        //     }}
        //   >
        //     notify
        //   </Button>
        // </React.Fragment>
    };
    return Notification;
}(React.Component));
export { Notification };
//# sourceMappingURL=Notification.js.map