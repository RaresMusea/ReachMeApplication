import './App.css';
import AuthenticationCore from "./Components/Authentication/Core/AuthenticationCore";
import {useNavigate} from 'react-router-dom';
import Feed from "./Components/Feed/Feed";

function App() {


    const navigator = useNavigate();

    const navigateToAuth = () => {
        navigator('/authentication');
    }

    const navigateToFeed = () => {
        console.log("da")
        navigator('/feed');
    }

    return (
        <>
            <div className="App">
                {localStorage.getItem("currentlyLoggedInUser") === null ?
                    <AuthenticationCore navigator={navigator} navigateToFeed={navigateToFeed}
                                        navigateToAuth={navigateToAuth}/>
                    :
                    <Feed/>
                }
            </div>
        </>
    );
}

export default App;
