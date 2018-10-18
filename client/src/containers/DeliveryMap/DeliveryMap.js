import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { getDeliveries } from "../../helpers/api";
import "./DeliveryMap.css";

const DeliveryLocation = ({ text }) => (
  <div className="location-text">{text}</div>
);

class DeliveryMap extends Component {
  constructor() {
    super();
    this.state = { deliveriesList: [] };
  }
  static defaultProps = {
    center: {
      lat: 55.8505,
      lng: -4.28775
    },
    zoom: 12
  };
  componentDidMount() {
    getDeliveries().then(data =>
      this.setState({
        deliveriesList: data.data
      })
    );
  }

  render() {
    const { deliveriesList } = this.state;
    return (
      // Important! Always set the container height explicitly
      <div className="map-container" style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          defaultCenter={
            this.props.center
            // bootstrapURLKeys={{ key: /* YOUR KEY HERE */ }}
          }
          defaultZoom={this.props.zoom}
        >
          {deliveriesList &&
            deliveriesList.map(delivery => {
              return (
                <DeliveryLocation
                  lat={Number(delivery.latitude)}
                  lng={Number(delivery.longitude)}
                  text={delivery.store_name}
                />
              );
            })}
        </GoogleMapReact>
      </div>
    );
  }
}

export default DeliveryMap;
