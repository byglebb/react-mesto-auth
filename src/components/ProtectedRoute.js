import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    <Route>
      {() =>
        props.isloggedIn === true ? <Component {...props} /> : <Redirect to="./sign-in" />
      }
    </Route>
  );
};

// const ProtectedRoute = ({ component, isloggedIn }) => {
//   return (
//     <Route>
//       {() =>
//         isloggedIn ? component : <Redirect to="/sign-in" />
//       }
//     </Route>
//   );
// };

export default ProtectedRoute;