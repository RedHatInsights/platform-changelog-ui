import React from "react";

import { Link } from "react-router-dom";

import { APP_ROOT } from '../AppConstants';

// wrapper link function to include APP_ROOT
function LinkWrapper({ to, children }) {
    return (
        <Link to={`${APP_ROOT}${to}`}>{children}</Link>
    )
}

export default LinkWrapper;