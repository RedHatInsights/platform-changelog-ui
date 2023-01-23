import React from "react";

import { Link } from "react-router-dom";

import { APP_ROOT } from '../AppConstants';

// wrapper link function to include APP_ROOT
// pass all props to Link
// including children
const LinkWrapper = (props) => {
    return (
        <Link to={`${APP_ROOT}${props.to}`}>{props.children}</Link>
    )
}

// function LinkWrapper({ to, children }) {
//     return (
//         <Link to={`${APP_ROOT}${to}`}>{children}</Link>
//     )
// }

export default LinkWrapper;