import Message from './Message';
import '../../../Styles/Messaging/Messages/Message.scss';
import {useContext, useEffect, useState} from "react";
import {ConversationContext} from "../../../Context/ConversationContext";
import {doc, onSnapshot} from "firebase/firestore";
import {firebaseFirestore} from "../../../Modules/Firebase/FirebaseIntegration";

export default function Messages() {
    const [messages, setMessages] = useState([]);
    const {data} = useContext(ConversationContext);

    useEffect(() => {
        const getConversations = () => {
            const unsubscribe = onSnapshot(doc(firebaseFirestore, "conversationsCollection", data.conversationIdentifier), (doc) => {
                if (doc.exists()) {
                    setMessages(doc.data().messages);
                }
            });

            return () => {
                unsubscribe();
            }
        };

        data.conversationIdentifier && getConversations();
    }, [data.conversationIdentifier]);
    return (
        <div className="Messages">{
            messages.map(msg => (<Message key={msg.messageIdentifier} message={msg}/>))
        }
        </div>
    );
}