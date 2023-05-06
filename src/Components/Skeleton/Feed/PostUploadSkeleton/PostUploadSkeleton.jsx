import {Skeleton} from "@mui/material";
import '../../../../Styles/Feed/Posts/Post Upload/PostUpload.scss';

export default function PostUploadSkeleton(){
    return(
        <div className="SkeletonElement">
            <Skeleton
                animation={"wave"}
                className="PostUploadAvatar"
                variant="circular"
                width={50}
                height={50}
                />
            <Skeleton
                className="FormSkeleton"
                animation={"wave"}
                variant="text"
                sx={{fontSize: '1em'}}
            />
        </div>
    );
}