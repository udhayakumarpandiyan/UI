import React from 'react';
import '../styles/DeviceDetails.scss';
import IntensitySlider from '../../../common/slider';

const DeviceDetails = (props) => {
    let device = props.selectedDevice;

    return (
        <div className="device-details">
            <div className="sub-content">
                <span className="title">Devices</span>
                <button className="add-device" onClick={props.onAddButtonClick}>
                    <img src={require("../../../assets/icons/plus-dk.png")} alt="" />
                </button>
            </div>
            <div className="sub-content">
                <span className="device-selected">{device && device.name}</span>
                <label className="switch">
                    <input type="checkbox" />
                    <span className="slider round">
                    </span>
                </label>
            </div>
            <div className="shades-section">
                <div className="sub-header">
                    <label className="sub-title">Shades</label>
                    <hr className="horizontal-line"></hr>
                </div>
                <div className="shades">
                    {device && device.shades && device.shades.map((shade, i) => {
                        return (
                            <span key={"shade" + i} className="checkbox-container">
                                <div className={shade.checked ? "checkbox-checked" : "checkbox"}
                                    style={{ backgroundColor: shade.color }}
                                    onClick={() => props.onShadeCheckBoxClick(device.shades, i)} />
                            </span>
                        )
                    })
                    }
                </div>
            </div>
            <div>
                <div className="sub-header">
                    <label className="sub-title">Mode</label>
                    <hr className="horizontal-line"></hr>
                </div>
                <div>
                    {device && device.modes && device.modes.map((mode, i) => {
                        return (
                            <div key={mode + i}
                                className={props.selectedMode.mode === mode.mode ? "mode-selected" : "mode"}
                                onClick={() => props.onModeClick(mode)}>
                                <span className="mode-left-content">
                                    <img className={i === 0 ? props.selectedMode.mode === mode.mode ? "mode-icon-first-selected" : "mode-icon-first" :
                                        props.selectedMode.mode === mode.mode ? "mode-icon-selected" : "mode-icon"}
                                        src={require("../../../assets/icons/" + mode.icon)} alt="" />
                                    <span className="mode-name">
                                        {mode.mode}
                                    </span>
                                </span>
                                <span className="mode-percentage">{`${mode.percentage}%`}</span>
                                <img src={props.selectedMode.mode === mode.mode ? require("../../../assets/icons/tick-wh.png") : require("../../../assets/icons/tick-wh-lt.png")} alt="" />
                            </div>
                        )
                    })
                    }
                </div>
            </div>
            <div>
                <div className="sub-header">
                    <label className="sub-title">Intensity</label>
                    <hr className="horizontal-line"></hr>
                </div>
                <IntensitySlider
                    size={260}
                    numTicks={200}
                    degrees={180}
                    min={1}
                    max={100}
                    value={props.intensity}
                    onHandleChange={props.onHandleChange}
                />
            </div>

        </div>
    );
}

export default DeviceDetails;
