import {lazy, useContext, useEffect, useState} from "react";
import NewUsersSkeleton from "../../../Skeleton/Feed/RightSideFeedSkeleton/NewUsersSkeleton";
import {onSnapshot} from "firebase/firestore";
import {accountsRef} from "../../../../Modules/Firebase/FirebaseIntegration";
import {StateManagementContext} from "../../../../Context/StateManagementContext";


const NewUser = lazy(() => import("./NewUser"));

export default function NewUsers() {
    const [newUsers, setNewUsers] = useState([]);
    const [observerCounter, setObserverCounter] = useState(0);
    const [loading, setLoading] = useState(true);
    const {joinedUserUpdate} = useContext(StateManagementContext);
    let count = 0;

    useEffect(() => {
        const unsubscribe = onSnapshot(accountsRef, (snapshot) => {
            snapshot.docs.map(() => {
                count++;
            });
            setObserverCounter(count);
        });
        return () => {
            unsubscribe();
        }
    }, []);

    useEffect(() => {
        if (observerCounter !== 0 || joinedUserUpdate === true) {
            fetch("http://localhost:8080/lastRegistration/lastFive")
                .then(response => response.json())
                .then(data => {
                    setNewUsers(data);
                    setTimeout(()=>{
                        setLoading(false);
                    },500);
                })
                .catch(() => console.error);
        }
    }, [observerCounter]);

    return (
        <div className="NewUsersWrapper">
            <h3>Recently joined ReachMe</h3>
            {
                loading ?
                    <NewUsersSkeleton rows={5}/>
                    :
                    newUsers.length !== 0 &&
                    newUsers.map(newUser =>
                        <NewUser newUser={newUser}/>
                    )
            }
        </div>
    )
}