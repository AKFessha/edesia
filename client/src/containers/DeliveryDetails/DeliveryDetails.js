import React, { Component } from "react";
import { getDeliveryById } from "../../helpers/api";
import { Link } from "react-router-dom";
class DeliveryDetails extends Component {
  constructor() {
    super();
    this.state = {
      delivery: {},
      message: ""
    };
  }
  componentDidMount() {
    const delivery_id = this.props.match.params.deliveryId;

    getDeliveryById(delivery_id).then(data => {
      this.setState({
        delivery: data.data
      });
    });
  }
  render() {
    const deliveryInfo = this.state.delivery;
    const message = "No matching delivery was found in our system";
    if (deliveryInfo === "") {
      return (
        <div>
          <h4> {message}</h4>
          <p>
            <Link to="/">Go back</Link>
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <h4> Delivery Details</h4>
          <p>
            Delivery Id <strong>{deliveryInfo.delivery_id}</strong>
          </p>
          <p>
            Delivery address <strong>{deliveryInfo.address}</strong>
          </p>
          <p>
            Delivery deadline <strong> {deliveryInfo.deadline}</strong>
          </p>
        </div>
      );
    }
  }
}

export default DeliveryDetails;
