import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Shipments() {
  const [shipments, setShipments] = useState([]);

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/shipments');
        setShipments(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchShipments();
  }, []);

  return (
    <div>
      <h2>🚚 Shipments</h2>
      <ul>
        {shipments.map((shipment) => (
          <li key={shipment._id}>
            <h4>Shipment ID: {shipment._id}</h4>
            <p>Status: {shipment.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Shipments;
