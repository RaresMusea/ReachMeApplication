import * as React from "react";
import {useContext, useEffect} from "react";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import {defaultNotificationIcon} from "../../../Modules/Object/ComponentProps";
import "../../../Styles/Navbar/NotificationManager.scss";
import {onSnapshot} from "firebase/firestore";
import {notificationsRef,} from "../../../Modules/Firebase/FirebaseIntegration";
import {loggedInAccount} from "../../../Services/Feed Services/FeedDrawerService";
import {increaseTheOpacity,} from "../../../Modules/Animation Control/Opacity";
import {NotificationContext} from "../../../Context/NotificationContext";

export default function NotificationManager() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    let validatedNotifications = [];
    const {messageNotifications, setMessageNotifications} =
        useContext(NotificationContext);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    /*const validateNotifications = (notificationsArray) => {
        if (notificationsArray.length === 0) {
            return [];
        }
        const result = [];
        for (let notification of notificationsArray) {
            console.log("Notifications: ");
            console.log(notification);
            if (notification[0] === "null") {
                continue;
            }
            if (notification[0].includes(loggedInAccount.userFirebaseIdentifier)) {
                if (notification[1]["notificationDetails"].length !== 0) {
                    for (
                        let i = 0;
                        i < notification[1]["notificationDetails"].length;
                        i++
                    ) {
                    }
                    result.push({
                        notificationDetails: notification[1]["notificationDetails"],
                        conversationId: notification[0],
                    });
                }
            }
        }
        return result;
    };*/

    useEffect(() => {
        let notif = {};
        const unsubscribe = onSnapshot(notificationsRef, (snapshot) => {
            snapshot.docs.map((doc) => {
                notif = doc.data();
                if (
                    Object.keys(notif).length !== 0 &&
                    Object.keys(notif)[0].includes(loggedInAccount.userFirebaseIdentifier)
                ) {
                    Object.entries(notif).forEach((entry) => {
                        if (entry[1].notificationDetails.length !== 0) {
                            if (validatedNotifications.length !== 0) {
                                validatedNotifications.forEach((validatedNotification) => {
                                    if (
                                        validatedNotification.senderId ===
                                        entry[1].notificationDetails[0].senderId
                                    ) {
                                        validatedNotification.numberOfUnreadMessages++;
                                    } else {
                                        validatedNotifications.push({
                                            sender: entry[1].notificationDetails[0].senderName,
                                            senderId: entry[1].notificationDetails[0].senderId,
                                            conversationId: Object.keys(notif)[0],
                                            numberOfUnreadMessages:
                                            entry[1].notificationDetails.length,
                                        });
                                    }
                                });
                            } else {
                                validatedNotifications.push({
                                    sender: entry[1].notificationDetails[0].senderName,
                                    senderId: entry[1].notificationDetails[0].senderId,
                                    receiverId:entry[1].notificationDetails[0].receiverId,
                                    conversationId: Object.keys(notif)[0],
                                    numberOfUnreadMessages: entry[1].notificationDetails.length,
                                });
                            }
                        }
                    });
                }
            });

            //setNotificationsCount(validateNotifications.length);
            let result=[];
            validatedNotifications.forEach(validatedMsg=>{
                if(validatedMsg.receiverId.includes(loggedInAccount.userFirebaseIdentifier)) {
                    result.push(validatedMsg);
                }
            });
            setMessageNotifications(result);
            result=[];
            validatedNotifications=[];
        });

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        console.log(messageNotifications);
        if (messageNotifications !== undefined) {
            if (messageNotifications.length !== 0) {
                increaseTheOpacity(document.querySelector(".Badge"));
            }
        }
    }, [messageNotifications]);

    return (
        <React.Fragment>
            <Tooltip title={"Notification Manager"}>
                <div
                    className={`NotificationIcon ${
                        messageNotifications.length !== 0 ? "NotificationTranslation" : ""
                    }`}
                >
                    <img
                        src={defaultNotificationIcon}
                        className="Icon"
                        id="SearchIcon2"
                        onClick={handleClick}
                        alt="Notifications Center"
                        title="Notifications"
                    />
                    {messageNotifications.length !== 0 && (
                        <div className="Badge">
                            <p>{messageNotifications.length}</p>
                        </div>
                    )}
                </div>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                className="NotificationMenu"
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    style: {
                        width: 850,
                    },
                    elevation: 0,
                    sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{horizontal: "right", vertical: "top"}}
                anchorOrigin={{horizontal: "right", vertical: "bottom"}}
            >
                {/* <MenuItem onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>*/}
                <h1 className="NotificationManagerTitle">Notification Manager</h1>
                <Divider/>
            </Menu>
        </React.Fragment>
    );
}
