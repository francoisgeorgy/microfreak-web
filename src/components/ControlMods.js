import React, {Component} from 'react';
import {
    MOD_DESTINATION,
    MOD_MATRIX,
    MOD_SOURCE,
    MOD_SOURCE_CSS
} from "../model";
import "./ControlMods.css";
import {inject, observer} from "mobx-react";

class ControlMods extends Component {

    render() {

        const {cc, state: S} = this.props;
        // const d = CONTROL[cc];
        // const v = d.mapping ? d.mapping(state.preset[cc]) : state.preset[cc];

        // console.log("mod color", cc, MOD_SOURCE_CSS[cc]);

        return (
            <div className="control-mods">
                {Object.getOwnPropertySymbols(MOD_SOURCE).map(
                    (src, i) => {
                        if (!MOD_DESTINATION[cc]) {
                            // console.log("not a destination", cc, CONTROL[cc].name, MOD_DESTINATION[cc], MOD_DESTINATION[cc]);
                            return null;
                        }
                        // console.log("source", src);
                        // console.log("destination", cc, CONTROL[cc].name);
                        // if (!MOD_MATRIX[src][cc]) {
                        //     console.log("no mod matrix for ", src, cc);
                        //     return null;
                        // }
                        const v = S.modMatrixValue(MOD_MATRIX[src][cc]);
                        // const v = Math.round(Math.random() * 1000) / 10;
                        // console.log(v);
                        // const v = S.modMatrixValue(MOD_MATRIX[CYC_ENV][CUTOFF]);
                        if (!v || (Math.abs(v) < 0.01)) {
                            // console.log("mod matrix too small ", v);
                            return null;
                        }
                        return (
                            <div key={i} className="mod" style={{background: `linear-gradient(to right, var(--${MOD_SOURCE_CSS[src]}) ${Math.abs(v)}%, #777 ${Math.abs(v)}%)`}}>
                                {/*<div className={`mod-fill ${MOD_SOURCE_CSS[src]}`} style={{width:"50%"}}>&nbsp;</div>*/}
                                <div className="mod-text">
                                    <div className="mod-name">{MOD_SOURCE[src]}</div>
                                    <div className="mod-value">{v}</div>
                                </div>
                            </div>
                        )
                    }
                )}
            </div>
        );

    }
}

export default inject('state')(observer(ControlMods));
