import React, { useState } from "react";
import { Modal, Button } from "antd";
import Person from "../../../../assets/person.png";
import Car from "../../../../assets/car-1.png";
import Masjid from "../../../../assets/mosquee.png";

const MapLegend = () => {
  const [visable, setVisable] = useState(true);

  const showModal = () => {
    setVisable(true);
  };

  const handleOk = (e) => {
    setVisable(false);
  };

  const handleCancel = (e) => {
    setVisable(false);
  };

  return (
    <div>
      <button onClick={showModal} className='map-legend-btn'>
        Show Map Legend
      </button>
      <Modal
        title='Please Read Before Proceeding'
        visible={visable}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className='map-legend'>
          <div className='map-legend-title-container'>
            <div className='map-legend-title'>Map Legend</div>
          </div>

          <div className='map-legend-box'>
            <img src={Person} className='map-legend-img' alt='Person' />
            <div className='map-legend-dec'>
              This pin represents the city or area you submitted when you opened this map
            </div>
          </div>
          <div className='map-legend-box'>
            <img src={Car} className='map-legend-img' alt='Car' />
            <div className='map-legend-dec'>
              This pin represents the pickup point of an available driver
            </div>
          </div>
          <div className='map-legend-box'>
            <img src={Masjid} className='map-legend-img' alt='Masjid' />
            <div className='map-legend-dec'>
              This pin represents the location of a Masjid or venue
            </div>
          </div>

          <div className='map-legend-box'>
            <div className='map-legend-line '></div>
            <div className='map-legend-dec'>
              This is a line which connects the driver's current location to the masjid/venue of
              choice for Jummah
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MapLegend;
