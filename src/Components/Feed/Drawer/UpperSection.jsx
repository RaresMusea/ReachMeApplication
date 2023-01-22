import {loggedInAccount} from "../../../Services/Feed Services/FeedDrawerService";
import ProfilePhotoManager from "./ProfilePhotoManager";

export default function UpperSection(props) {

    return (
        <div className='Upper'>
            <div className='DrawerHeading'>
                <h3 className='UpperDrawerTitle'>My account</h3>
            </div>
            <ProfilePhotoManager update={props.update}/>
            <p className='RealName'
               title='Name'>
                {loggedInAccount.userRealName}
            </p>
            <p className='Text'
               title='Username'>
                {loggedInAccount.userName}
            </p>
        </div>);
}