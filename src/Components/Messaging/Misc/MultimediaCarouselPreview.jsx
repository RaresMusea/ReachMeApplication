import {useContext} from "react";
import {ResourceSharingContext} from "../../../Context/ResourceSharingContext";
import {ConversationContext} from "../../../Context/ConversationContext";
import Carousel from 'react-material-ui-carousel'
import '../../../Styles/Messaging/Misc/ImageCarouselPreview.scss';

export default function MultimediaCarouselPreview() {
    const {resource, type} = useContext(ResourceSharingContext);
    const {data} = useContext(ConversationContext);

    return (

        <>
            <p className="CarouselHeadingTitle">
                {`You are about to share ${resource.length} ${type}s with ${data.user.userRealName}:`}
            </p>
            <div className="CarouselWrapper">
                <Carousel>
                    {
                        type === 'images'
                            ?
                            resource.map((item, key) => <CarouselImageItem item={item}
                                                                           key={key}/>)
                            :
                            resource.map((item, key) => <CarouselVideoItem item={item}
                                                                           key={key}/>)
                    }
                </Carousel>
            </div>
        </>
    )
}

function CarouselImageItem(props) {
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

function CarouselVideoItem(props) {
    return (
        <>
            <div>
                <video src={props.item}
                       controls
                       className="CarouselVideoPreview"/>
            </div>
        </>
    )
}
