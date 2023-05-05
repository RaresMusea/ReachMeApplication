import {Skeleton} from "@mui/material";
import '../../../../Styles/Skeleton/NewUsersSkeleton.scss';

export default function NewUsersSkeleton(props) {
    const items = props.rows;
    const list = Array.from(Array(5).fill(items));

    return (
        <>
            {
                list.map(() =>
                    <div className="NewUsersSkeletonWrapper">
                        <div className="SkeletonElement">
                            <Skeleton animation={"wave"} variant="circular" width={40} height={40}/>
                            <Skeleton className="TextSkeleton" animation={"wave"} variant="text" sx={{fontSize: '1em'}}/>
                        </div>
                    </div>
                )
            }
        </>
    )
}