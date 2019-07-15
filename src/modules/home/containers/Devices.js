import React, { Component } from 'react';
import SideBar from '../components/SideBar';
import DeviceDetails from '../components/DeviceDetails';
import Modal from '../../../common/modal';
import AddDevice from '../components/AddDevice';
import data from '../../home/data.json';
import '../styles/Devices.scss';

let newDeviceUsage = "";
let newDeviceName = "";

class Devices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      devices: data.devices,
      selectedDevice: data.devices[1],
      selectedDeviceIndex: 1,
      sidebarCollapsed: false,
      showAddDevicePopup: false,
      selectedMode: data.devices[1].modes[0],
      intensity: data.devices[1].modes[0].percentage
    }
  }

  onDeviceClick = (device, index) => {
    this.setState({
      selectedDevice: device, selectedMode: device.modes[0],
      intensity: device.modes[0].percentage,
      selectedDeviceIndex: index
    });
  }

  onBackArrowClick = () => {
    this.setState({ sidebarCollapsed: !this.state.sidebarCollapsed })
  }

  onShadeCheckBoxClick = (shades, index) => {
    shades.forEach((shade, i) => {
      shade.checked = i === index ? !shade.checked : false;
    });
    this.setState({ selectedDevice: this.state.selectedDevice });
  }

  addNewDevice = () => {
    this.setState({ showAddDevicePopup: true });
  }

  onModeClick = (mode) => {
    this.setState({ selectedMode: mode, intensity: mode.percentage });
  }

  handleChange = (value) => {
    this.setState({ intensity: value });
  }

  // Add device popup handler functions
  onDeviceNameChange = (event) => {
    newDeviceName = event.target.value;

  }
  onDeviceUsageChange = (event) => {
    newDeviceUsage = event.target.value;

  }
  onDeviceShadesChange = (event) => {

  }
  addDeviceIntoList = (event) => {
    if (newDeviceName.length > 0 && newDeviceUsage.length > 0) {
      this.setState({ isAdding: true });
      setTimeout(() => {
        let devices = this.state.devices;
        let newDevice = Object.assign({}, devices[1]);
        newDevice.name = newDeviceName;
        newDevice.usage = newDeviceUsage;
        devices.push(newDevice);
        newDeviceName = "";
        newDeviceUsage = "";
        this.setState({ devices: devices, showAddDevicePopup: false, isAdding: false });
      }, 4000);
    }
    else {
      //
    }

  }

  closeAddDevicePopup = () => {
    this.setState({ showAddDevicePopup: false });
  }
  //////////////////

  render() {
    return (
      <div id="main" className="main-container">
        <SideBar
          devices={this.state.devices}
          selectedDeviceIndex={this.state.selectedDeviceIndex}
          sidebarCollapsed={this.state.sidebarCollapsed}
          onDeviceClick={this.onDeviceClick}
          onBackArrowClick={this.onBackArrowClick} />

        <DeviceDetails selectedMode={this.state.selectedMode}
          intensity={this.state.intensity}
          onHandleChange={this.handleChange}
          selectedDevice={this.state.selectedDevice}
          onAddButtonClick={this.addNewDevice}
          onShadeCheckBoxClick={this.onShadeCheckBoxClick}
          onModeClick={this.onModeClick} />

        {this.state.showAddDevicePopup && <Modal>

          <div className="modal">
            <AddDevice isAdding={this.state.isAdding}
              onDeviceNameChange={this.onDeviceNameChange}
              onDeviceUsageChange={this.onDeviceUsageChange}
              onDeviceShadesChange={this.onDeviceShadesChange}
              addDeviceIntoList={this.addDeviceIntoList}
              closeAddDevicePopup={this.closeAddDevicePopup} />
          </div>

        </Modal>
        }

      </div>
    );
  }
}

export default Devices;
