import React from 'react';
import '../styles/SideBar.scss';

const SideBar = (props) => {
    let collapsed = props.sidebarCollapsed;
    return (
        <div className={collapsed ? "sidebar-container-collapsed" : "sidebar-container"}>
            <div className={collapsed ? "back-arrow-collapsed" : "back-arrow"}
                onClick={props.onBackArrowClick} />
            {props.devices && props.devices.map((device, index) => {
                return (
                    <div key={"device" + index} className={collapsed ? "device-collapsed" : "device"} onClick={() => props.onDeviceClick(device, index)}>
                        {!collapsed && <div className={collapsed ? "device-info-collapsed" : props.selectedDeviceIndex === index ? "device-info-selected" : "device-info"}>
                            <span className={collapsed ? "device-name-collapsed" : "device-name"}>{device.name}</span>
                            <span className="device-usage">{device.usage}</span>
                        </div>
                        }
                        <img className={collapsed ? props.selectedDeviceIndex === index ? "device-image-selected-collpased" : "device-image-collapsed" : props.selectedDeviceIndex === index ? "device-image-selected" : "device-image"}
                            alt="sd" src={require(`../../../assets/images/${device.image}`)} />
                        {props.selectedDeviceIndex === index && <div className={collapsed ? "pointer-collapsed" : "pointer"}>
                        </div>
                        }
                    </div>
                )
            })
            }

        </div>
    );
}

export default SideBar;
