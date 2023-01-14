import './App.css';
import AuthenticationCore from "./Components/Authentication/Core/Scripts/AuthenticationCore";
import {useNavigate} from 'react-router-dom';
import userWasPreviouslyLoggedIn from "./Components/General Purpose/MiscModule";
import Homepage from "./Components/Landing/Scripts/Homepage";

function App() {

    const navigator = useNavigate();

    const navigateToAuth = () => {
        navigator('/authentication');
    }

    const navigateToFeed=()=>{
        navigator('/feed');
    }

    return (
        <>
            { userWasPreviouslyLoggedIn()?
                <div className="App" onLoad={navigateToAuth}>
                    <AuthenticationCore navigator={navigator}/>
                </div>
                :
                <div onLoad ={navigateToFeed}>
                    <Homepage/>
                </div>
            }
        </>
    );
}

export default App;
