import React from 'react';
import '../styles/AddDevice.scss';
const AddDevice = (props) => {
    return (
        <div className="add-device-popup">
            <div className="top-container">
                <label className="title">Add Device</label>
                <img alt="close" onClick={props.closeAddDevicePopup} />
            </div>
            <input placeholder="Enter device name" onChange={props.onDeviceNameChange}></input>
            <input placeholder="Enter usage" onChange={props.onDeviceUsageChange}></input>
            <div className="button-container">
                <button onClick={props.addDeviceIntoList}>Add Device</button>
                <button className="cancel"
                    onClick={props.closeAddDevicePopup}>Cancel</button>
            </div>
            {props.isAdding && <div className="loader-container">
                <div className="loader">
                    Adding new device ...
              </div>
            </div>
            }
        </div>
    );
}
export default AddDevice;