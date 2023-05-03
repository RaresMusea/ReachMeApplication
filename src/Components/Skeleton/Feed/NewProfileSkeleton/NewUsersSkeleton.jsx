import {Skeleton} from "@mui/material";

export default function NewUsersSkeleton() {
    return (
        <div className="NewUsersSkeletonWrapper">
            <div className="SkeletonElement">
                <Skeleton animation={"wave"} variant="circular" width={40} height={40}/>
                <Skeleton animation={"wave"} variant="text" sx={{fontSize: '1em'}}/>
                <Skeleton animation={"wave"} variant="text" sx={{fontSize: '1em'}}/>
            </div>
        </div>
    )
}