import { Skeleton } from "@mui/material";

function SkeletonElement() {
    return (
        <>

        <Skeleton variant="rounded" height={130} animation={false}/> 
        <Skeleton animation={false} /> 
        <Skeleton width="60%" animation={false}/>
        {/* <Skeleton variant="rounded"width={100} height={140} animation="wave"/> */}
        </>
    );
}

export default SkeletonElement;