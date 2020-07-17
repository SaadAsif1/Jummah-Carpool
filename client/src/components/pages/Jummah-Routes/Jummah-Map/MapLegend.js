import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import Person from '../../../../assets/person.png';
import Car from '../../../../assets/car-1.png';
import Masjid from '../../../../assets/mosquee.png';

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
              This pin makes the your current address that you typed in before this page
            </div>
          </div>
          <div className='map-legend-box'>
            <img src={Car} className='map-legend-img' alt='Car' />
            <div className='map-legend-dec'>
              This pin represents an avaliabe driver an there current location
            </div>
          </div>
          <div className='map-legend-box'>
            <img src={Masjid} className='map-legend-img' alt='Masjid' />
            <div className='map-legend-dec'>
              This pin represents a the location of a Mosque
            </div>
          </div>

          <div className='map-legend-box'>
            <div className='map-legend-circle-person'></div>
            <div className='map-legend-dec'>
              This radius circle is predefine by us. If any drivers are in this radius we
              recommand to contact them this way they will most likey carpool.
            </div>
          </div>

          <div className='map-legend-box'>
            <div className='map-legend-circle-driver'></div>
            <div className='map-legend-dec'>
              This radius circle is set by the driver. This defined by the driver. This
              shows how far the driver is willing to go to pick some one up.
            </div>
          </div>

          <div className='map-legend-box'>
            <div className='map-legend-line '></div>
            <div className='map-legend-dec'>
              This is a line which connect the driver current location to the masjid of
              choice for Jummah.
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MapLegend;
