import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class GMap extends React.Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
    };

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    };

    render() {
        return (
            <Map google={this.props.google}
                 initialCenter={{
                     lat: this.props.location.state.lat,
                     lng: this.props.location.state.lng
                 }}
                 zoom={16.75}
                 onClick={this.onMapClicked}>
                <Marker onClick={this.onMarkerClick}
                        name={'descripton'}
                        position={{lat: this.props.location.state.lat, lng: this.props.location.state.lng}}/>

                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>
                    <div>
                        <h3>{this.state.selectedPlace.name}</h3>
                    </div>
                </InfoWindow>
            </Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyAeEYdRmc6U_UWEEdAHBFA05ZEdQvlv4Iw')
})(GMap)




