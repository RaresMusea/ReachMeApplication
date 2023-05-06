import React, {lazy, useContext, useEffect, useState} from "react";
import Navbar from "../Navbar/Navbar";
import {getRequiredMetadata, loggedInAccount,} from "../../Services/Feed Services/FeedDrawerService";
import {currentlyLoggedInUser} from "../../Modules/Session/CurrentSessionModule";
import "react-toastify/dist/ReactToastify.css";
import {onSnapshot} from "firebase/firestore";
import {notificationsRef} from "../../Modules/Firebase/FirebaseIntegration";
import {NotificationContext} from "../../Context/NotificationContext";
import {sortReceivedNotifications} from "../../Modules/Common Functionality/CommonFunctionality";
import '../../Styles/Feed/Feed.scss';
import PostUpload from "./Posts/Post Upload/PostUpload";

const NewUsers = lazy(() => import("./Right Panel/New Users/NewUsers"));
const UserActivityCollection = lazy(() => import("./Right Panel/User Activity/UserActivityCollection"));

export default function Feed() {
    const [update, setUpdate] = useState(false);
    let {setMessageNotifications} =
        useContext(NotificationContext);
    let result = [];
    let notif = {};
    let validatedNotifications = [];

    useEffect(() => {
        const unsubscribe = onSnapshot(notificationsRef, (snapshot) => {
            snapshot.docs.map((doc, index) => {
                if (snapshot.docs[index]._key.path.segments[6] === loggedInAccount.userFirebaseIdentifier) {
                    notif = doc.data();
                    if (notif !== {}) {
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
                                                    notificationDate: entry[1].notificationDetails[entry[1].notificationDetails.length - 1].sendingDate,
                                                });
                                            }
                                        });
                                    } else {
                                        console.table(validatedNotifications);
                                        validatedNotifications.push({
                                            sender: entry[1].notificationDetails[0].senderName,
                                            senderId: entry[1].notificationDetails[0].senderId,
                                            receiverId: entry[1].notificationDetails[0].receiverId,
                                            conversationId: Object.keys(notif)[0],
                                            numberOfUnreadMessages: entry[1].notificationDetails.length,
                                            notificationDate: entry[1].notificationDetails[entry[1].notificationDetails.length - 1].sendingDate,
                                        });
                                    }
                                }
                            });
                        }
                    }
                }
            });

            validatedNotifications.forEach(validatedMsg => {
                console.log(validatedMsg)
                if (validatedMsg.senderId !== loggedInAccount.userFirebaseIdentifier) {
                    result.push(validatedMsg);
                }
            });

            sortReceivedNotifications(result);
            console.table(result)
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
            <div className="FeedWrapper">
                <div className="LeftSide">
                    <PostUpload/>
                    <p>Post</p>
                    <p>Post</p>
                    <p>Post</p>
                    <p>Post</p>
                    <p>Post</p>
                    <p>Post</p>
                </div>
                <div className="RightSide">
                    <NewUsers/>
                    <UserActivityCollection/>
                </div>
            </div>
            <div id="SignOutModal"/>
        </>
    );
}
