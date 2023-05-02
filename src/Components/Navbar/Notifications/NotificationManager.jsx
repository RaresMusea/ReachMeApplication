import * as React from "react";
import {useContext, useEffect} from "react";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import {defaultNotificationIcon} from "../../../Modules/Object/ComponentProps";
import "../../../Styles/Navbar/Notifications/NotificationManager.scss";
import {increaseTheOpacity,} from "../../../Modules/Animation Control/Opacity";
import {NotificationContext} from "../../../Context/NotificationContext";
import Notification from "./Notification";

export default function NotificationManager() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const {messageNotifications} =
        useContext(NotificationContext);

    const handleClick = async (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        if (messageNotifications.length !== 0) {
            //new Audio(notificationSound).play().then(console.error);
            increaseTheOpacity(document.querySelector(".Badge"));
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
                <h1 className="NotificationManagerTitle">Notification Manager</h1>
                {
                    messageNotifications.length === 0 ?
                        <div className="NoNotifications">You don't have any notifications.</div>
                        :
                        <div className="NotificationsOn">
                            {
                                messageNotifications.map(notification =>
                                    <>
                                        <Notification
                                            key={notification.sender}
                                            handleClose={handleClose}
                                            content={notification}
                                        /></>
                                )
                            }
                        </div>
                }
            </Menu>
        </React.Fragment>
    );
}
