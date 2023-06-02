import {useContext} from "react";
import {StateManagementContext} from "../../Context/StateManagementContext";


export default function RechargeToast({closeToast}){
    const {setManualRecharge} = useContext(StateManagementContext);

    return(
        <div>
            <p>You're not in sync with the last feed updates. Do you want to recharge?</p>
            <button
                onClick={()=>{setManualRecharge(true)}}
                style={{marginRight:"1em"}}>Yes</button>
            <button onClick={closeToast}>No</button>
        </div>
    );
}