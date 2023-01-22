import {Alert} from "@mui/material";
import ReactDOM from 'react-dom/client';
import {decreaseTheOpacity, increaseTheOpacity} from "../Animation Control/Opacity";

export const renderAlert = (alertConfig) => {
    const alert = <Alert variant={"filled"}
                         severity={alertConfig.severity}
                         className={alertConfig.class}
    >
        {alertConfig.message}
    </Alert>

    const wrapper = document.createElement('div');
    const target = document.querySelector(alertConfig.targetId);
    wrapper.id = alertConfig.alertType;
    target.appendChild(wrapper);

    const root = ReactDOM.createRoot(document.getElementById(wrapper.id));
    increaseTheOpacity(wrapper);
    root.render(alert);
    setTimeout(() => {
        decreaseTheOpacity(wrapper);
    }, alertConfig.fadeOutTimeout)
    setTimeout(() => {
        wrapper.remove();
    }, alertConfig.removeTimeout);

}