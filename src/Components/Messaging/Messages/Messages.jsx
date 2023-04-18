import Message from './Message';
import '../../../Styles/Messaging/Messages/Message.scss';
import {useContext, useEffect, useState} from "react";
import {ConversationContext} from "../../../Context/ConversationContext";
import {doc, onSnapshot} from "firebase/firestore";
import {firebaseFirestore} from "../../../Modules/Firebase/FirebaseIntegration";
import {loggedInAccount} from "../../../Services/Feed Services/FeedDrawerService";
import {parseDateAndTime} from "../../../Modules/Date/DatePipeModule";
import {OpenContext} from "../../../Context/OpenContext";

export default function Messages() {
    const [messages, setMessages] = useState([]);
    const {data} = useContext(ConversationContext);
    const {target} = useContext(OpenContext);
    const [firstInConversation, setFirstInConversation] = useState("");

    useEffect(() => {
        const getConversations = () => {
            const unsubscribe = onSnapshot(doc(firebaseFirestore, "conversationsCollection", data.conversationIdentifier), (doc) => {
                if (doc.exists()) {
                    setMessages(doc.data().messages);
                    const mess = doc.data().messages;
                    setFirstInConversation(mess[0]?.senderIdentifier === loggedInAccount.userFirebaseIdentifier ?
                        loggedInAccount.userRealName : target);
                }
            });

            return () => {
                unsubscribe();
            }
        };

        data.conversationIdentifier && getConversations();
    }, [data.conversationIdentifier]);
    return (
        <>
            <div className="Messages">
                <div className="MessagesHeading">
                    {`${firstInConversation} started this conversation 
                    ${messages[0]?.date ? parseDateAndTime(messages[0]?.date.toDate()) : ``}.`}
                </div>
                {
                    messages.map(msg => (<Message key={msg.messageIdentifier} message={msg}/>))
                }
                <div id="UploadSnackbar"/>
            </div>
        </>
    );
}