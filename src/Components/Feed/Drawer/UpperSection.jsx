import {currentLoggedInUser} from "../../../Services/Feed Services/FeedDrawerService";
import ProfilePhotoManager from "./ProfilePhotoManager";

export default function UpperSection() {

    return (
        <div className='Upper'>
            <div className='DrawerHeading'>
                <h3 className='UpperDrawerTitle'>My account</h3>
            </div>
            <ProfilePhotoManager/>
            <p className='RealName'
               title='Name'>
                {currentLoggedInUser.userRealName}
            </p>
            <p className='Text'
               title='Username'>
                {currentLoggedInUser.userName}
            </p>
        </div>);
}