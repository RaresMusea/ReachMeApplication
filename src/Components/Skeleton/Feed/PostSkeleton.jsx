import '../../../Styles/Skeleton/PostSkeleton.scss';
import {Skeleton} from "@mui/material";


export default function PostSkeleton(props) {
    return (
        <div>
            <div className="SkeletonPostHeader">
                <Skeleton animation="wave"
                          variant="circular"
                          width={40}
                          height={40}/>
                <Skeleton className="Details"
                          animation="wave"
                          variant="rounded"
                          width={450}
                          height={10}/>
            </div>
            {
                props.post.postType === "text" ?
                    <div className="TextPostSkeleton">
                        <Skeleton className="Description"
                                  animation="wave"
                                  variant="rounded"
                                  width={100}
                                  height={30}/>
                    </div>
                    :
                    <div className="MediaPostSkeleton">
                        <Skeleton animation="wave"
                                  variant="rounded"
                                  className="TinyDescription"
                                  width={100}
                                  height={10}/>
                        <Skeleton animation="wave"
                                  variant="rectangular"
                                  className="MediaResource"
                                  width={100}
                                  height={400}/>
                    </div>
            }
        </div>
    );
}