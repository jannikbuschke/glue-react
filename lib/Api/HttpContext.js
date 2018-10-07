import * as React from "react";
export var createContext = function (apiUrl, httpContextPath) {
    return React.createContext({ apiUrl: apiUrl, httpContextPath: httpContextPath });
};
//# sourceMappingURL=HttpContext.js.map