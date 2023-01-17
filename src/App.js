import './App.css';
import AuthenticationCore from "./Components/Authentication/Core/AuthenticationCore";
import {useNavigate} from 'react-router-dom';
import {userWasLoggedInPreviously} from "./Modules/Session/CurrentSessionModule";
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
            {userWasLoggedInPreviously() ?
                <div className="App" onLoad={navigateToAuth}>
                    <AuthenticationCore navigator={navigator}/>
                </div>
                :
                <div onLoad={navigateToFeed}>
                    <Homepage/>
                </div>
            }
        </>
    );
}

export default App;
