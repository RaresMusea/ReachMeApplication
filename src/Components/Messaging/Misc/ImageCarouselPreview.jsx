import {useContext} from "react";
import {ResourceSharingContext} from "../../../Context/ResourceSharingContext";
import {ConversationContext} from "../../../Context/ConversationContext";
import Carousel from 'react-material-ui-carousel'
import '../../../Styles/Messaging/Misc/ImageCarouselPreview.scss';

export default function ImageCarouselPreview() {
    const {resource} = useContext(ResourceSharingContext);
    const {data} = useContext(ConversationContext);

    return (

        <>
            <p className="CarouselHeadingTitle">
                {`You are about to share ${resource.length} images with ${data.user.userRealName}:`}
            </p>
            <div className="CarouselWrapper">
                <Carousel>
                    {
                        resource.map((item, key) => <CarouselItem item={item}
                                                                  key={key}/>)
                    }
                </Carousel>
            </div>
        </>
    )
}

function CarouselItem(props) {
    return (
        <>
            <div>
                <img src={props.item}
                     alt={"Image"}
                     className="CarouselImagePreview"/>
            </div>
        </>
    )
}
