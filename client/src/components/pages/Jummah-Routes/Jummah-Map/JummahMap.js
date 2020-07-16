import React, { Component } from 'react';
import {
  Map,
  GoogleApiWrapper,
  InfoWindow,
  Marker,
  Circle,
  Polyline,
} from 'google-maps-react';

import masjid from '../../../../assets/mosquee.png';
import car from '../../../../assets/car-1.png';

const mapStyles = {
  width: '100%',
  height: '100%',
};

export class JummahMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false, //Hides or the shows the infoWindow
      activeMarker: {}, //Shows the active marker upon click
      selectedPlace: {}, //Shows the infoWindow to the selected place upon a marker
      cordinates: this.props.state.coordinates,
      address: this.props.state.address,
    };
  }

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

  render() {
    const triangleCoords = [
      [
        { lat: 32.81692, lng: -117.16051 },
        { lat: 32.82046, lng: -117.16601 },
      ],
      [
        { lat: 32.748741, lng: -117.087273 },
        { lat: 32.82046, lng: -117.16601 },
      ],
    ];

    const triangleCoords2 = [
      {
        currentLocation: { lat: 32.81692, lng: -117.16051 },
        masjid: { lat: 32.82046, lng: -117.16601 },
      },
      {
        currentLocation: { lat: 32.748741, lng: -117.087273 },
        masjid: { lat: 32.82046, lng: -117.16601 },
      },
    ];

    return (
      <div>
        {this.state.cordinates && (
          <Map
            google={this.props.google}
            zoom={14}
            style={mapStyles}
            initialCenter={this.state.cordinates}
            streetViewControl={false}
            mapTypeControl={false}
          >
            {/* <Marker
              onClick={this.onMarkerClick}
              name={this.state.address}
            />
            <Marker
              onClick={this.onMarkerClick}
              name={this.state.address}
            /> */}

            {triangleCoords.map((store, index) => (
              <Polyline
                path={store}
                strokeColor='#0000FF'
                strokeOpacity={0.8}
                strokeWeight={2}
              />
            ))}

            {triangleCoords2.map((store, index) => (
              <Marker
                key={index}
                id={index}
                position={{
                  lat: store.masjid.lat,
                  lng: store.masjid.lng,
                }}
                onClick={() => console.log('You clicked me!')}
                icon={{
                  url: masjid,
                }}
              />
            ))}

            {triangleCoords2.map((store, index) => (
              <Marker
                key={index}
                id={index}
                position={{
                  lat: store.currentLocation.lat,
                  lng: store.currentLocation.lng,
                }}
                onClick={() => console.log('You clicked me!')}
                icon={{
                  url: car,
                }}
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
            {/* <Circle
              radius={647.4} // In Meters
              center={this.state.cordinates}
              onMouseover={() => console.log('mouseover')}
              onClick={() => console.log('click')}
              onMouseout={() => console.log('mouseout')}
              strokeColor='transparent'
              strokeOpacity={0}
              strokeWeight={5}
              fillColor='#FF0000'
              fillOpacity={0.2}
            /> */}
          </Map>
        )}
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBYHSjax_jdoZXv-eNPEwRx7lFF5FlJ3qU',
})(JummahMap);
