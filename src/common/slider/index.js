import React from 'react';
import './index.scss';

class IntensitySlider extends React.Component {
    constructor(props) {
        super(props);

        this.fullAngle = props.degrees;
        this.startAngle = (360 - props.degrees) / 2;
        this.endAngle = this.startAngle + props.degrees;
        this.margin = props.size * 0.02;
        this.currentDeg = Math.floor(
            this.convertRange(
                props.min,
                props.max,
                this.startAngle,
                this.endAngle,
                props.value
            )
        );

        this.state = { deg: this.currentDeg };
        this.root = null;
    }
    componentDidMount() {
        this.root = document.getElementById("root");
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.value !== nextProps.value) {
            let prevVal = this.props.value;
            let newVal = nextProps.value;
            if (newVal > prevVal) {
                newVal = newVal - prevVal;
                this.currentDeg = this.state.deg + (newVal * 1.8);
            }
            else {
                newVal = prevVal - newVal;
                this.currentDeg = this.state.deg - (newVal * 1.8);
            }
            this.setState({ deg: this.currentDeg });
        }
    }

    startDrag = e => {
        e.preventDefault();
        const knob = e.target.getBoundingClientRect();
        const pts = {
            x: knob.left + knob.width / 2,
            y: knob.top + knob.height / 2
        };
        const moveHandler = e => {
            this.currentDeg = this.getDeg(e.clientX, e.clientY, pts);
            if (this.currentDeg === this.startAngle) this.currentDeg--;
            let newValue = Math.floor(
                this.convertRange(
                    this.startAngle,
                    this.endAngle,
                    this.props.min,
                    this.props.max,
                    this.currentDeg
                )
            );
            this.setState({ deg: this.currentDeg });
            this.props.onHandleChange(newValue);
        };
        document.addEventListener("mousemove", moveHandler);
        document.addEventListener("mouseup", e => {
            document.removeEventListener("mousemove", moveHandler);
        });
    };

    getDeg = (cX, cY, pts) => {
        const x = cX - pts.x;
        const y = cY - pts.y;
        let deg = Math.atan(y / x) * 180 / Math.PI;
        if ((x < 0 && y >= 0) || (x < 0 && y < 0)) {
            deg += 90;
        } else {
            deg += 270;
        }
        let finalDeg = Math.min(Math.max(this.startAngle, deg), this.endAngle);
        return finalDeg;
    };

    convertRange = (oldMin, oldMax, newMin, newMax, oldValue) => {
        return (oldValue - oldMin) * (newMax - newMin) / (oldMax - oldMin) + newMin;
    };

    renderTicks = () => {
        let ticks = [];
        const incr = this.fullAngle / this.props.numTicks;
        const size = this.margin + this.props.size / 2;
        for (let deg = this.startAngle; deg <= this.endAngle; deg += incr) {
            const tick = {
                deg: deg,
                tickActiveStyle: {
                    height: size + 2,
                    left: size - 1,
                    top: size + 2,
                    transform: "rotate(" + deg + "deg)",
                    transformOrigin: "top"
                },
                tickStyle: {
                    height: size - 1,
                    left: size - 2,
                    top: size,
                    transform: "rotate(" + deg + "deg)",
                    transformOrigin: "top"
                }
            };
            ticks.push(tick);
        }
        return ticks;
    };

    copyStyle = style => {
        return JSON.parse(JSON.stringify(style));
    };

    render() {
        let kStyle = {
            width: this.props.size,
            height: this.props.size,
            marginTop: 1
        };

        let iStyle = this.copyStyle(kStyle);
        let oStyle = this.copyStyle(kStyle);
        oStyle.margin = this.margin;

        let hStyle = {
            width: this.props.size / 100 * 15,
            height: this.props.size / 100 * 15,
            bottom: -(this.props.size / 100 * 8),
            left: this.props.size / 2,
        };

        let vStyle = {
            top: this.props.size / 2 - 30,
            left: this.props.size / 2 - 20,
            textAlign: "center"
        }

        iStyle.transform = "rotate(" + this.state.deg + "deg)";
        
        return (
            <div className="intensity-slider" style={kStyle}>
                <div className="ticks">
                    {this.props.numTicks
                        ? this.renderTicks().map((tick, i) => (
                            <div
                                key={i}
                                className={
                                    "tick" + (tick.deg <= this.currentDeg ? " active" : "")
                                }
                                style={tick.deg <= this.currentDeg ? tick.tickActiveStyle : tick.tickStyle}
                            />
                        ))
                        : null}
                </div>
                <div className="outer" style={oStyle} onMouseDown={this.startDrag}>
                    <div className="inner" style={iStyle}>

                        <div id="handle" className="handle" style={hStyle} />
                    </div>
                </div>
                <div className="range-value" style={vStyle}>{this.props.value}</div>
            </div>
        );
    }
}
IntensitySlider.defaultProps = {
    size: 160,
    min: 10,
    max: 30,
    numTicks: 0,
    degrees: 270,
    value: 0
};

export default IntensitySlider;
