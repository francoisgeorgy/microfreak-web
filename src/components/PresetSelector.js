import React, {Component} from "react";
import "./PresetSelector.css";
import {inject, observer} from "mobx-react";
import {PORT_OUTPUT} from "./Midi";
import {portById} from "../utils/midi";
import WebMidi from "webmidi";

class PresetSelector extends Component {

    state = {
        direct_access: false
    };

    toggleDirectAccess = () => {
        this.setState({direct_access: !this.state.direct_access})
    };

    selectPreset = n => {
        const P = this.props.state.midi.ports;
        for (const port_id of Object.keys(P)) {
            if (P[port_id].enabled && P[port_id].type === PORT_OUTPUT) {
                const port = portById(port_id);
                if (global.dev) console.log(`send PC ${n} to ${port.name} ${port.id}`);
                port.sendControlChange(WebMidi.MIDI_CONTROL_CHANGE_MESSAGES.bankselectcoarse, n < 128 ? 0 : 1);
                port.sendProgramChange(n % 128);
            }
        }
    };

    render() {

        const pc = [];
        for (let i=0; i<256; i++){
            pc.push(<div key={i} onClick={() => this.selectPreset(i)}>{i}</div>);
        }

        return (
            <div className="preset-selector">
                <div className="seq-access">
                    <div>prev</div>
                    <div>next</div>
                    <div className="toggle" onClick={this.toggleDirectAccess}>&#8943;</div>
                </div>
                <div className="direct-access">{this.state.direct_access && pc}</div>
            </div>
        );
    }

}

export default inject('state')(observer(PresetSelector));