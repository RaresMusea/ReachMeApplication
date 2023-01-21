import './App.css';
import AuthenticationCore from "./Components/Authentication/Core/AuthenticationCore";
import {useNavigate} from 'react-router-dom';
import Feed from "./Components/Feed/Feed";

function App() {
    const navigator = useNavigate();

    const navigateToAuth = () => {
        navigator('/authentication');
    }

    return (
        <>
            <div className="App">

                {localStorage.getItem("currentlyLoggedInUser") === null ?
                    <AuthenticationCore navigator={navigator}
                                        navigateToAuth={navigateToAuth}/>
                    :
                    <Feed/>
                }
            </div>
        </>
    );
}

export default App;
