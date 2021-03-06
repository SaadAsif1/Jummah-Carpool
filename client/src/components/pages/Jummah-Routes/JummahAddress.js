import React, { useEffect } from "react";
import { Input, notification } from "antd";
import { Link } from "react-router-dom";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { GoogleApiWrapper } from "google-maps-react";
import Geocode from "react-geocode";
import { EnvironmentFilled } from "@ant-design/icons";
import "./Jummah.css";

Geocode.setApiKey("AIzaSyBYHSjax_jdoZXv-eNPEwRx7lFF5FlJ3qU");

function JummahAddress({ location }) {
  const [address, setAddress] = React.useState("");
  const [curCity, setCity] = React.useState({
    city: "",
  });
  const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null,
  });

  useEffect(() => {
    // Check if the redirect from /auth/activate/:token sent use state
    if (!location.state) {
      return;
    } else {
      notification.warning({ message: location.state.state.message });
    }
  }, []);

  // When User Actually Selects Address
  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);

    Geocode.fromLatLng(latLng.lat, latLng.lng).then(
      (response) => {
        const addressArray = response.results[0].address_components;
        const city = getCity(addressArray);

        setCity({ city: city ? city : true });
      },
      (error) => {
        console.error(error);
      }
    );
  };

  // Get City
  const getCity = (addressArray) => {
    let city = "";
    for (let i = 0; i < addressArray.length; i++) {
      if (
        addressArray[i].types[0] &&
        "administrative_area_level_2" === addressArray[i].types[0]
      ) {
        city = addressArray[i].long_name;
        return city;
      }
    }
  };

  // city Disabled
  const disableCity = () => {
    if (curCity.city === true) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className='jummah-address-container'>
      <div className='align-center jummah-address-title'>What City Are You In?</div>
      <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <Input
              style={{ width: "100%" }}
              size='large'
              {...getInputProps({ placeholder: "Type address" })}
            />

            <div>
              {suggestions.map((suggestion, index) => {
                const style = {
                  backgroundColor: suggestion.active
                    ? "rgba(193, 174, 236, 0.8)"
                    : "#fff",
                  padding: "0.3rem",
                };

                return (
                  <div key={index} {...getSuggestionItemProps(suggestion, { style })}>
                    <EnvironmentFilled /> {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      <div className=' align-center'>
        <Link
          to={{
            pathname: "/jummah-map",
            state: { address, coordinates, curCity },
          }}
          disabled={disableCity()}
        >
          <button
            className='jummah-options-btn align-center'
            style={{ borderRadius: "0", margin: "2rem 0" }}
            onClick={() => console.log(address, coordinates, curCity)}
            disabled={disableCity()}
          >
            Next
          </button>
        </Link>
      </div>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBYHSjax_jdoZXv-eNPEwRx7lFF5FlJ3qU",
})(JummahAddress);
