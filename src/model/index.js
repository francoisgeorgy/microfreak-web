import {getRightShift} from "../utils/bits-utils";

export const multibytesValue = (MSB, LSB, msb_byte, mask_msb, sign_byte, mask_sign) => {

    // if mask_sign is 0, sign is ignored

    // console.log("multibytesValue", h(MSB), h(LSB), h(msb_byte), h(mask_sign), h(mask_msb));

    let sign_bit = 0;
    if (mask_sign > 0) {
        const j = getRightShift(mask_sign);
        sign_bit = (sign_byte >> j) & 0x01;
    }

    const k = getRightShift(mask_msb);
    const msb_bit = (msb_byte >> k) & 0x01;

    // const neg = msb & 0x02;
    const high = (MSB & 0x7f) << 8;
    const mid  = LSB & 0x7f;
    const low = msb_bit << 7;
    const n = high + mid + low;
    // let f;
    let raw;
    if (sign_bit) {
        // const c2 = ((~n) & 0x7fff) + 1;
        // f = - (c2 * 1000 / 32768);
        raw = -(((~n) & 0x7fff) + 1)
    } else {
        // f = n * 1000 / 32768;
        raw = n;
    }

    // round to one decimal is done with Math.round(n * 10) / 10.

    return Math.round(raw * 1000 / 32768) / 10;
    // return Math.round(f) / 10;
};

const _0_100 = function (v) {
    return Math.floor(v / 127 * 100 + 0.5);
};

// default mask for LSB and MSB : 0x7f
// default mask for MSB_lsb : 0x01
// default mask for sign in MSB_lsb : 0x02

export const DEFAULT_msb_mask = 0x01;
export const DEFAULT_sign_mask = 0x02;

export const CYC_ENV = Symbol();
export const ENV = Symbol();
export const PRESS = Symbol();
export const KEY_ARP = Symbol();
export const LFO = Symbol();

export const PITCH = Symbol();
export const WAVE = Symbol();
export const TIMBRE = Symbol();
export const CUTOFF = Symbol();
export const ASSIGN1 = Symbol();
export const ASSIGN2 = Symbol();
export const ASSIGN3 = Symbol();

export const GLIDE = Symbol();
export const OSC_TYPE = Symbol();
export const OSC_WAVE = Symbol();
export const OSC_TIMBRE = Symbol();
export const OSC_SHAPE = Symbol();
export const FILTER_CUTOFF = Symbol();
export const FILTER_RESONANCE = Symbol();
export const CYCLING_ENV_RISE = Symbol();
export const CYCLING_ENV_FALL = Symbol();
export const CYCLING_ENV_HOLD = Symbol();
export const CYCLING_ENV_AMOUNT = Symbol();
export const ARP_SEQ_RATE_FREE = Symbol();
export const ARP_SEQ_RATE_SYNC = Symbol();
export const LFO_RATE_FREE = Symbol();
export const LFO_RATE_SYNC = Symbol();
export const ENVELOPE_ATTACK = Symbol();
export const ENVELOPE_DECAY = Symbol();
export const ENVELOPE_SUSTAIN = Symbol();
export const KEYBOARD_HOLD_BUTTON = Symbol();
export const KEYBOARD_SPICE = Symbol();


// names (labels)
export const MOD_SOURCE = {
    [CYC_ENV] : 'Cyclic Env',
    [ENV]: 'Env',
    [LFO]: 'LFO',
    [PRESS]: 'Pressure',
    [KEY_ARP]: 'Key/Arp'
};

// names (labels)
export const MOD_DESTINATION = {
    [PITCH]: 'Pitch',
    [WAVE]: 'Wave',
    [TIMBRE]: 'Timbre',
    [CUTOFF]: 'Cutoff',
    [ASSIGN1]: 'Assign 1',
    [ASSIGN2]: 'Assign 2',
    [ASSIGN3]: 'Assign 3'
};

// [row, col] for data receives when reading preset. Data does not include sysex header, sysex footer, man. id and constant data header
export const MOD_MATRIX = {
    // TODO: nibble
    [CYC_ENV]: {
        [PITCH]: {
            MSB: [22, 15],
            LSB: [22, 14],
            msb: [22, 8, 0x20],
            sign: [22, 8, 0x40]
        },
        [WAVE]: {
            MSB: [24, 3],
            LSB: [24, 2],
            msb: [24, 0, 0x02],
            sign: [24, 0, 0x04]
        },
        [TIMBRE]: {
            MSB: [25, 22],
            LSB: [25, 21],
            msb: [25, 16, 0x10],
            sign: [25, 16, 0x20]
        },
        [CUTOFF]: {
            MSB: [27, 10],
            LSB: [27, 9],
            msb: [27, 8, 0x01],
            sign: [27, 8, 0x02]
        },
        [ASSIGN1]: {
            MSB: [28, 29],
            LSB: [28, 28],
            msb: [28, 24, 0x08],
            sign: [28, 24, 0x10]
        },
        [ASSIGN2]: {
            MSB: [0, 0],
            LSB: [0, 0],
            msb: [0, 0, 0x01],
            sign: [0, 0, 0x02]
        },
        [ASSIGN3]: {
            MSB: [0, ],
            LSB: [0, ],
            msb: [0, 0, 0x01],
            sign: [0, 0, 0x02]
        }
    },
    [ENV]: {
        [PITCH]: {              // OK
            MSB: [22, 25],
            LSB: [22, 23],
            msb: [22, 16, 0x40],
            sign: [22, 24, 0x01]
        },
        [WAVE]: {
            MSB: [24, 12],
            LSB: [24, 11],
            msb: [24, 8, 0x40],
            sign: [24, 8, 0x80]
        },
        [TIMBRE]: {
            MSB: [25, 31],
            LSB: [25, 30],
            msb: [25, 24, 0x20],
            sign: [25, 24, 0x40]
        },
        [CUTOFF]: {
            MSB: [27, 19],
            LSB: [27, 18],
            msb: [27, 16, 0x02],
            sign: [27, 16, 0x04]
        },
        [ASSIGN1]: {
            MSB: [0, 0],
            LSB: [0, 0],
            msb: [0, 0, 0x01],
            sign: [0, 0, 0x02]
        },
        [ASSIGN2]: {
            MSB: [0, 0],
            LSB: [0, 0],
            msb: [0, 0, 0x01],
            sign: [0, 0, 0x02]
        },
        [ASSIGN3]: {
            MSB: [0, 0],
            LSB: [0, 0],
            msb: [0, 0, 0x01],
            sign: [0, 0, 0x02]
        }
    },
    [LFO]: {
        [PITCH]: {    // OK
            MSB: [23, 2],
            LSB: [23, 1],
            msb: [23, 0, 0x01],
            sign: [23, 0, 0x02]
        },
        [WAVE]: {
            MSB: [24, 21],
            LSB: [24, 20],
            msb: [24, 16, 0x04],
            sign: [24, 16, 0x08]
        },
        [TIMBRE]: {
            MSB: [26, 9],
            LSB: [26, 7],
            msb: [26, 0, 0x40],
            sign: [26, 8, 0x01]
        },
        [CUTOFF]: {
            MSB: [27, 28],
            LSB: [27, 27],
            msb: [27, 24, 0x02],
            sign: [27, 24, 0x04]
        },
        [ASSIGN1]: {
            MSB: [0, 0],
            LSB: [0, 0],
            msb: [0, 0, 0x01],
            sign: [0, 0, 0x02]
        },
        [ASSIGN2]: {
            MSB: [0, 0],
            LSB: [0, 0],
            msb: [0, 0, 0x01],
            sign: [0, 0, 0x02]
        },
        [ASSIGN3]: {
            MSB: [0, 0],
            LSB: [0, 0],
            msb: [0, 0, 0x01],
            sign: [0, 0, 0x02]
        }
    },
    [PRESS]: {
        [PITCH]: {
            MSB: [23, 11],
            LSB: [23, 10],
            msb: [23, 8, 0x02],
            sign: [23, 8, 0x04]
        },
        [WAVE]: {
            MSB: [24, 30],
            LSB: [24, 29],
            msb: [24, 24, 0x10],
            sign: [24, 24, 0x20]
        },
        [TIMBRE]: {
            MSB: [26, 18],
            LSB: [26, 17],
            msb: [26, 16, 0x01],
            sign: [26, 16, 0x02]
        },
        [CUTOFF]: {
            MSB: [28, 5],
            LSB: [28, 4],
            msb: [28, 0, 0x08],
            sign: [28, 0, 0x10]
        },
        [ASSIGN1]: {
            MSB: [0, 0],
            LSB: [0, 0],
            msb: [0, 0, 0x01],
            sign: [0, 0, 0x02]
        },
        [ASSIGN2]: {
            MSB: [0, 0],
            LSB: [0, 0],
            msb: [0, 0, 0x01],
            sign: [0, 0, 0x02]
        },
        [ASSIGN3]: {
            MSB: [0, 0],
            LSB: [0, 0],
            msb: [0, 0, 0x01],
            sign: [0, 0, 0x02]
        }
    },
    [KEY_ARP]: {
        [PITCH]: {
            MSB: [23, 20],
            LSB: [23, 19],
            msb: [23, 16, 0x04],
            sign: [23, 16, 0x08]
        },
        [WAVE]: {
            MSB: [25, 7],
            LSB: [25, 6],
            msb: [25, 0, 0x20],
            sign: [25, 0, 0x40]
        },
        [TIMBRE]: {
            MSB: [26, 27],
            LSB: [26, 26],
            msb: [26, 24, 0x02],
            sign: [26, 24, 0x04]
        },
        [CUTOFF]: {
            MSB: [28, 14],
            LSB: [28, 13],
            msb: [28, 8, 0x10],
            sign: [28, 8, 0x20]
        },
        [ASSIGN1]: {
            MSB: [0, 0],
            LSB: [0, 0],
            msb: [0, 0, 0x01],
            sign: [0, 0, 0x02]
        },
        [ASSIGN2]: {
            MSB: [0, 0],
            LSB: [0, 0],
            msb: [0, 0, 0x01],
            sign: [0, 0, 0x02]
        },
        [ASSIGN3]: {
            MSB: [0, 0],
            LSB: [0, 0],
            msb: [0, 0, 0x01],
            sign: [0, 0, 0x02]
        }
    }
};

export const CONTROL = {
    [GLIDE]: {
        MSB: [0, 0],
        LSB: [0, 0],
        //sign: [0, 0, 0x02],
        msb: [0, 0, 0x01],
        cc: 5,
        mapping: null,
        name: "Glide"
    },
    [OSC_TYPE]: {
        MSB: [0, 0],
        LSB: [0, 0],
        //sign: [0, 0, 0x02],
        msb: [0, 0, 0x01],
        cc: 9,
        mapping: null,  //_osc_type,
        name: "Type"
    },
    [OSC_WAVE]: {
        MSB: [0, 27],
        LSB: [0, 26],
        //sign: [0, 0, 0x02],
        msb: [0, 24, 0x01],
        cc: 10,
        mapping: null,
        name: 'Wave'
    },
    [OSC_TIMBRE]: {
        MSB: [0, 0],
        LSB: [0, 0],
        //sign: [0, 0, 0x02],
        msb: [0, 0, 0x01],
        cc: 12,
        mapping: null,
        name: 'Timbre'
    },
    [OSC_SHAPE]: {
        MSB: [1, 20],
        LSB: [1, 19],
        //sign: [0, 0, 0x02],
        msb: [1, 16, 0x02],
        cc: 13,
        mapping: null,
        name: 'Shape'
    },
    [FILTER_CUTOFF]: {
        MSB: [0, 0],
        LSB: [0, 0],
        //sign: [0, 0, 0x02],
        msb: [0, 0, 0x01],
        cc: 23,
        mapping: null,
        name: 'Cutoff'
    },
    [FILTER_RESONANCE]: {
        MSB: [0, 0],
        LSB: [0, 0],
        //sign: [0, 0, 0x02],
        msb: [0, 0, 0x01],
        cc: 83,
        mapping: null,
        name: 'Resonance'
    },
    [CYCLING_ENV_RISE]: {
        MSB: [4, 6],
        LSB: [4, 5],
        //sign: [0, 0, 0x02],
        msb: [4, 0, 0x10],
        cc: 102,
        mapping: null,  //_0_100,
        name: 'Rise'
    },
    [CYCLING_ENV_FALL]: {
        MSB: [5, 2],
        LSB: [5, 1],
        //sign: [0, 0, 0x02],
        msb: [5, 0, 0x01],
        cc: 103,
        mapping: null,
        name: 'Fall'
    },
    [CYCLING_ENV_HOLD]: {
        MSB: [5, 12],
        LSB: [5, 11],
        //sign: [0, 0, 0x02],
        msb: [5, 8, 0x04],
        cc: 28,
        mapping: null,
        name: 'Hold'
    },
    [CYCLING_ENV_AMOUNT]: {
        MSB: [6, 6],
        LSB: [6, 5],
        //sign: [0, 0, 0x02],
        msb: [6, 0, 0x10],
        cc: 24,
        mapping: null,
        name: 'Amount'
    },
    [ARP_SEQ_RATE_FREE]: {
        MSB: [0, 0],
        LSB: [0, 0],
        //sign: [0, 0, 0x02],
        msb: [0, 0, 0x01],
        cc: 91,
        mapping: null,
        name: 'Rate free'
    },
    [ARP_SEQ_RATE_SYNC]: {
        MSB: [0, 0],
        LSB: [0, 0],
        //sign: [0, 0, 0x02],
        msb: [0, 0, 0x01],
        cc: 92,
        mapping: null,
        name: 'Rate sync'
    },
    [LFO_RATE_FREE]: {
        MSB: [0, 0],
        LSB: [0, 0],
        //sign: [0, 0, 0x02],
        msb: [0, 0, 0x01],
        cc: 93,
        mapping: null,
        name: 'Rate free'
    },
    [LFO_RATE_SYNC]: {
        MSB: [0, 0],
        LSB: [0, 0],
        //sign: [0, 0, 0x02],
        msb: [0, 0, 0x01],
        cc: 94,
        mapping: null,
        name: 'Rate sync'
    },
    [ENVELOPE_ATTACK]: {
        MSB: [14, 29],
        LSB: [14, 28],
        // sign: [1, 0x02],
        msb: [14, 24, 0x08],
        cc: 105,
        mapping: null,
        name: 'Attack'
    },
    [ENVELOPE_DECAY]: {
        MSB: [0, 0],
        LSB: [0, 0],
        //sign: [0, 0, 0x02],
        msb: [0, 0, 0x01],
        cc: 106,
        mapping: null,
        name: 'Decay/Rel'
    },
    [ENVELOPE_SUSTAIN]: {
        MSB: [15, 23],
        LSB: [15, 22],
        //sign: [0, 0, 0x02],
        msb: [15, 16, 0x20],
        cc: 29,
        mapping: null,
        name: 'Sustain'
    },
    [KEYBOARD_HOLD_BUTTON]: {
        MSB: [0, 0],
        LSB: [0, 0],
        //sign: [0, 0, 0x02],
        msb: [0, 0, 0x01],
        cc: 64,
        mapping: null,
        name: 'Hold'
    },
    [KEYBOARD_SPICE]: {
        MSB: [0, 0],
        LSB: [0, 0],
        //sign: [0, 0, 0x02],
        msb: [0, 0, 0x01],
        cc: 2,
        mapping: null,
        name: 'Spice'
    }
};

const _osc_type = function (v) {
    switch (v) {
        case 10:
            return "Basic Waves";
        case 21:
            return "Superwave";
        case 32:
            return "Wavetable";
        case 42:
            return "Harmonic";
        case 53:
            return "KarplusStrong";
        case 64:
            return "V. Analog";
        case 74:
            return "Waveshaper";
        case 85:
            return "Two Op. FM";
        case 95:
            return "Formant";
        case 106:
            return "Chords";
        case 117:
            return "Speech";
        case 127:
            return "Modal";
        default:
            return v;
    }
};
