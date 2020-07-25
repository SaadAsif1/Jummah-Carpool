import React, { Component } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker, Polyline } from "google-maps-react";
import axios from "axios";
import { Input, Typography } from "antd";
import randomColor from "randomcolor";
import MapLegend from "./MapLegend";
import { withRouter, Link } from "react-router-dom";
import { isAuth } from "../../../../helpers/auth";
import masjid from "../../../../assets/mosquee.png";
import car from "../../../../assets/car-1.png";
import person from "../../../../assets/person.png";
import "./JummahMap.css";
const { Paragraph } = Typography;

// Map Styles
const mapStyles = {
  width: "100%",
  height: "100%",
};

export class JummahMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false, //Hides or the shows the infoWindow
      activeMarker: {}, //Shows the active marker upon click
      selectedPlace: {}, //Shows the infoWindow to the selected place upon a marker
      coordinates: "",
      address: "",
      data: "",
      driverPostData: "",
    };
  }

  // Calls Api For Driver Data When components mounts
  componentDidMount() {
    // Check if the redirect from /auth/activate/:token sent use state
    if (!this.props.location.state) {
      return this.props.history.push("/jummah-address", {
        state: { message: "Please enter your city!" },
      });
    } else {
      if (this.props.location.state.city === "") {
        console.log(true);
        return this.props.history.push("/jummah-address", {
          state: { message: "Please enter your city!" },
        });
      }

      this.setState({
        coordinates: this.props.location.state.coordinates,
        address: this.props.location.state.address,
      });
    }

    axios
      .get(
        `/api/driver/${this.props.location.state.curCity.city
          .replace(/\s+/g, "-")
          .toLowerCase()}`
      )
      .then((response) => {
        this.setState({
          data: response.data.drivers,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // When a Marker Is clicked
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  polylineCoords() {
    let polylines = [];

    this.state.data.map((locations) => {
      polylines.push([
        locations.masjid_location[0].coordinates,
        locations.current_location[0].coordinates,
      ]);
    });

    return polylines;
  }

  milesIntoMeters(value) {
    return 1609.34 * value;
  }

  render() {
    return (
      <div>
        {this.state.data ? (
          <Map
            google={this.props.google}
            zoom={14}
            style={mapStyles}
            initialCenter={this.state.coordinates}
            streetViewControl={false}
            mapTypeControl={false}
          >
            <Marker
              position={this.state.coordinates}
              icon={{
                url: person,
              }}
              onClick={this.onMarkerClick}
              name={`${this.state.address} (Your Current Location)`}
            />

            {this.polylineCoords().map((locations, index) => (
              <Polyline
                key={index}
                path={locations}
                strokeColor={randomColor({
                  luminosity: "dark",
                  format: "rgb",
                })}
                strokeOpacity={1}
                strokeWeight={3}
              />
            ))}

            {this.state.data.map((masjids, index) => (
              <Marker
                key={index}
                id={index}
                position={masjids.masjid_location[0].coordinates}
                icon={{
                  url: masjid,
                }}
                onClick={this.onMarkerClick}
                name={`${masjids.masjid_location[0].address} (${masjids.user.name} Destination)`}
              />
            ))}

            {this.state.data.map((driverCurrent, index) => (
              <Marker
                key={index}
                id={index}
                position={driverCurrent.current_location[0].coordinates}
                onClick={() => this.setState({ driverPostData: [driverCurrent] })}
                icon={{
                  url: car,
                }}
                name={driverCurrent.current_location[0].address}
              />
            ))}

            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onClose={this.onClose}
            >
              <div>
                <h4>{this.state.selectedPlace.name}</h4>
              </div>
            </InfoWindow>
          </Map>
        ) : (
          <div></div>
        )}

        {this.state.data ? (
          <div className='jummah-map-sidebar'>
            <div className='map-post-title-container'>
              <div className='map-post-title'>
                {this.state.driverPostData.length > 0
                  ? `${this.state.driverPostData[0].user.name} Driver Post`
                  : `All Post's In City`}
              </div>
            </div>

            <Input
              size='large'
              style={{ color: "black" }}
              value={this.state.address}
              disabled
            />

            <MapLegend />

            <button
              onClick={() => {
                this.setState({ driverPostData: [] });
              }}
              style={
                this.state.driverPostData.length > 0
                  ? { display: "block", width: "100%", marginTop: "-1rem" }
                  : { display: "none", width: "100%", marginTop: "-1rem" }
              }
              className='btn back-btn-map'
            >
              ← Back
            </button>

            {(this.state.driverPostData.length > 0
              ? this.state.driverPostData
              : this.state.data
            ).map((driver, index) => (
              <div className='jummah-map-box' key={index}>
                <div className='jummah-map-main-title'>
                  <div className='jummah-map-main-title-div'>{driver.user.name} </div>
                  <div className='jummah-map-main-title-div'>
                    {new Date(driver.createdAt).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>
                <div className='jummah-map-sub-box'>
                  <div className='jummah-map-box-title'>Masjid</div>
                  <div className='jummah-map-box-body'>
                    {driver.masjid_location[0].address}
                  </div>
                </div>

                <div className='jummah-map-sub-box'>
                  <div className='jummah-map-box-title'>Jummah Timings (Friday)</div>
                  <div className='jummah-map-box-body'>
                    {driver.jumma_timings[0].start} - {driver.jumma_timings[0].end}
                  </div>
                </div>

                <div className='jummah-map-sub-box'>
                  <div className='jummah-map-box-title'>Current Location</div>
                  <div className='jummah-map-box-body'>
                    {driver.current_location[0].address}
                  </div>
                </div>

                <div className='jummah-map-sub-box'>
                  <div className='jummah-map-box-title'>
                    Time Leaving Current Location
                  </div>
                  <div className='jummah-map-box-body'>{driver.time_leaving}</div>
                </div>

                <div className='jummah-map-sub-box'>
                  <div className='jummah-map-box-title'>Driver Message</div>
                  <div className='jummah-map-box-body'>
                    {driver.message}
                  </div>
                </div>

                <div className='jummah-map-sub-box'>
                  <div className='jummah-map-box-title '>Contact {driver.user.name}</div>
                  {isAuth() ? (
                    <div
                      className='jummah-map-contact-container align-center flex-center'
                      style={{ color: "white" }}
                    >
                      <a
                        className='btn-contact'
                        href={`mailto:${
                          isAuth() && isAuth().email
                        }?subject=Jummah%20Carpool%20Passanger&body=Hi%20my%20name%20is%20${
                          isAuth() && isAuth().email
                        }%20I%20want%20to%20ride%20with%20you%20because%20I%20saw%20your%20posting%20on%20the%20website`}
                        disabled={isAuth() ? false : true}
                      >
                        Email
                      </a>
                      <a
                        className='btn-contact'
                        href={`tel:${driver.phone_number}`}
                        disabled={isAuth() ? false : true}
                      >
                        Phone Number
                      </a>
                    </div>
                  ) : (
                    <Link to='/sign-up'>
                      <button className='btn sign-contact-btn'>Sign Up To View</button>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBYHSjax_jdoZXv-eNPEwRx7lFF5FlJ3qU",
})(withRouter(JummahMap));
