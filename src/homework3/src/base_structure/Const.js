export const DIRECTION = {
    LEFT: "left",
    RIGHT: "right",
    STRAIGHT: "straight",
};

export const ISINSIDE = {
    INSIDE: "INSIDE",
    OUTSIDE: "OUTSIDE",
    NODETERMINED: "No information",
};

export const DISTANCE ={
    NEAR: "near",
    FAR: "far"
}


if (window.DIRECTION === undefined) {
    window.DIRECTION = DIRECTION;
}

if (window.ISINSIDE === undefined) {
    window.ISINSIDE = ISINSIDE;
}

if (window.DISTANCE === undefined) {
    window.DISTANCE = DISTANCE;
}