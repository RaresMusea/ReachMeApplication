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
    const [conversationStartDate, setConversationStartDate] = useState(null);

    useEffect(() => {
        const getConversations = () => {
            const unsubscribe = onSnapshot(doc(firebaseFirestore, "conversationsCollection", data.conversationIdentifier), (doc) => {
                if (doc.exists()) {
                    setMessages(doc.data().messages);
                    const mess = doc.data().messages;
                    if (mess.length === 0) {
                        setFirstInConversation(loggedInAccount.userRealName);
                        setConversationStartDate(parseDateAndTime(new Date()));
                    } else {
                        setFirstInConversation(mess[0]?.senderIdentifier === loggedInAccount.userFirebaseIdentifier ?
                            loggedInAccount.userRealName : target);
                        setConversationStartDate(parseDateAndTime(messages[0]?.date.toDate()));
                    }
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
                    ${conversationStartDate}.`}
                </div>
                {
                    messages &&
                    messages.map(msg => (<Message key={msg.messageIdentifier} message={msg}/>))
                }
                <div id="UploadSnackbar"/>
            </div>
        </>
    );
}