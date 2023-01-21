import SignOutModal from "../Components/Authentication/Sign Out/SignOutModal";
import ReactDOM from 'react-dom/client';

export const destroyModal=()=>{
    document.getElementById('wrapper').remove();
}

export const renderSignOutModal = (config) => {
    const signOutModal = <SignOutModal image={config.image}
                                       isOpen={config.isOpen}
                                       navigator={config.navigator}/>

    const wrapper = document.createElement('div');
    wrapper.id='wrapper';
    const target = document.querySelector(config.targetId);
    wrapper.id = 'ModalContent';
    target.appendChild(wrapper);
    const root = ReactDOM.createRoot(document.getElementById(wrapper.id));
    root.render(signOutModal);
}