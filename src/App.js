import './App.css';
import AuthenticationCore from "./Components/Authentication/Core/Scripts/AuthenticationCore";
import {useNavigate} from 'react-router-dom';

function App() {

    const navigator = useNavigate();

    const navigateToAuth = () => {
        navigator('/authentication/signup');
    }

    return (
        <div className="App" onLoad={navigateToAuth}>
            <AuthenticationCore/>
        </div>
    );
}

export default App;
