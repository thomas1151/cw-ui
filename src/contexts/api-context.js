import React, { Component } from 'react';

export const srcs = {
    prod: {
        url: "https://cw.thomasbarratt.co.uk/"
    },
    dev: {
        url: "http://192.168.1.107/cw-be/public_html/"
    },
};

export const SrcContext = React.createContext(
    srcs.dev // default value
);