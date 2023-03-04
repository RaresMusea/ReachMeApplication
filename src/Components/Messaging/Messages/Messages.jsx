import Message from './Message';
import '../../../Styles/Messaging/Messages/Message.scss';

export default function Messages(props) {
    return (
        <div className="Messages">
            <Message loggedUserIsSender={true}/>
            <Message loggedUserIsSender={false}/>
            <Message loggedUserIsSender={false}/>
            <Message loggedUserIsSender={false}/>
            <Message loggedUserIsSender={true}/>
            <Message loggedUserIsSender={true}/>
            <Message loggedUserIsSender={false}/>
            <Message loggedUserIsSender={true}/>
            <Message loggedUserIsSender={false}/>
            <Message loggedUserIsSender={true}/>
        </div>
    );
}