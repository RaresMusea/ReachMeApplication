import {useState} from "react";
import {toast} from "react-toastify";

export default function useGeoLocation() {
    const [geo, setGeo] = useState("");

    const notifyErrorToast = (message) => toast.error(message);

    const getCoordinates = async () => {
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        const success = async (position) => {
            const coords = position.coords;
            const latitude = coords.latitude.toString();
            const longitude = coords.longitude.toString();
            const positionArray = [latitude, longitude];
            await retrieveCity(positionArray);
        }

        const error = (err) => {
            notifyErrorToast(`Error while trying to access your location! 
            Please try again later. More details: ${err.message} `);
        }
        console.log(geo);
        navigator.geolocation.getCurrentPosition(success, error, options);
    }

    const retrieveCity = async (coordinates) => {
        const latitude = coordinates[0];
        const longitude = coordinates[1];

        fetch(`https://us1.locationiq.com/v1/reverse.php?key=pk.84e290595ccd20871c15594310c0ed3c&lat=${latitude}&lon=${longitude}&format=json`)
            .then(response => response.json())
            .then(data => {
                console.log("data");
                console.log(data);
                setGeo({
                    "county": data.address.county,
                    "country": data.address.country,
                });
            })
            .catch(error => {
                notifyErrorToast(`Error while trying to retrieve your location! 
            Please try again later. More details: ${error} `);
            })

    }

    return {
        getCoordinates,
        geo,
    }
}