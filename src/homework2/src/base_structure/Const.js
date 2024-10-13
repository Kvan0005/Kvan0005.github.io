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


if (window.DIRECTION === undefined) {
    window.DIRECTION = DIRECTION;
}

if (window.ISINSIDE === undefined) {
    window.ISINSIDE = ISINSIDE;
}