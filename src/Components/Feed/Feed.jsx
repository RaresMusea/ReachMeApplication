import React, {useContext, useEffect, useState} from "react";
import Navbar from "../Navbar/Navbar";
import {getRequiredMetadata, loggedInAccount,} from "../../Services/Feed Services/FeedDrawerService";
import {currentlyLoggedInUser} from "../../Modules/Session/CurrentSessionModule";
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from "react-toastify";
import {onSnapshot} from "firebase/firestore";
import {notificationsRef} from "../../Modules/Firebase/FirebaseIntegration";
import {NotificationContext} from "../../Context/NotificationContext";

export default function Feed() {
    const [update, setUpdate] = useState(false);
    let {setMessageNotifications} =
        useContext(NotificationContext);
    let result = [];
    let notif = {};
    let validatedNotifications = [];

    useEffect(() => {
            const unsubscribe = onSnapshot(notificationsRef, (snapshot) => {
                snapshot.docs.map((doc) => {
                    notif = doc.data();
                    if(notif!=={}) {
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
                                            receiverId: entry[1].notificationDetails[0].receiverId,
                                            conversationId: Object.keys(notif)[0],
                                            numberOfUnreadMessages: entry[1].notificationDetails.length,
                                        });
                                    }
                                }
                            });
                        }
                    }
                });
                console.table("VALIDATED:",validatedNotifications);
                validatedNotifications.forEach(validatedMsg => {
                    console.log(validatedMsg)
                    if (validatedMsg.senderId !== loggedInAccount.userFirebaseIdentifier) {
                        result.push(validatedMsg);
                    }
                });
                console.table("RESULT", result);
                setMessageNotifications(result);
                validatedNotifications = [];
                result = [];
            });
            return () => {
                unsubscribe();
            };
    }, []);


    useEffect(() => {
        document.title = `ReachMe - Feed`;
        getRequiredMetadata(currentlyLoggedInUser);
    }, []);


    useEffect(() => {
        if (update) {
            getRequiredMetadata(currentlyLoggedInUser);
            setUpdate(false);
        }
    }, [update]);

    const scheduleUpdate = () => {
        setUpdate(true);
    };

    const resetPageTitleToFeedState = () => {
        document.title = "ReachMe - Feed";
    };


    return (
        <>
            <Navbar
                resetPageTitleToFeedState={resetPageTitleToFeedState}
                scheduleUpdate={scheduleUpdate}
            />
            <div id="SignOutModal"/>
            <ToastContainer/>
        </>
    );
}
