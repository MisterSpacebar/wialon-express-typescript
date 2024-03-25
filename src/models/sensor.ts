export let sensorTemplate = {
    itemId: 0, // sensor id
    id: 0, // sensor id, 0 for new sensor
    callMode: "", // sensor call mode (action: create, update, delete or clone)
    unlink: 0, // Delete links with another sensors and unit parameters by removing (1 - yes (default), 0 - no )
    n: "", // sensor name
    t: "", // sensor type
    d: "", // sensor description
    m: "", // sensor measurement units
    p: "", // sensor parameter
    f: 0,   // sensor flags
    c: "", // sensor configuration
    vt: 0, // sensor validation type
    vs: 0, // sensor validation scale
    tbl: [ // sensor calibration table
        {
            x: 0.0,
            a: 0.0,
            b: 0.0
        }
    ]
};

// Sensor flags:
// Flag 	Description
// 0x01 	sensor type: instant
// 0x02 	sensor type: differential
// 0x03 	sensor type: differential with overflow (2 bytes)
// 0x04 	sensor type: switch from off to on
// 0x05 	sensor type: switch from on to off
// 0x20 	activate “With overflow” option (see below)
// 0x40 	apply lower/upper bounds AFTER calculation (see below) 

//  Sensor configuration params:
// "{
// \"act\":<bool>,
// \"appear_in_popup\":<bool>,
// \"ci\":<object>,
// \"filter\":<long>,
// \"mu\":<uint>,
// \"pos\":<uint>,
// \"show_time\":<bool>,
// \"unbound_code\":<text>,
// \"validate_driver_unbound\":<bool>,
// \"timeout\":<uint>,
// \"uct\":<bool>,
// \"lower_bound\":<double>,
// \"upper_bound\":<double>,
// \"text_params\":<uint>
//  }" 

