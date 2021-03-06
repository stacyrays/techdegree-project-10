import React from "react";
import { Link } from "react-router-dom";

export default ({ context }) => {
  const authUser = context.authenticatedUser;
  return (
    <div className="header">
      <div className="bounds">
        <h1 className="header--logo">
          <a href="/">City College</a>
        </h1>
        {
          <nav>
            {authUser ? (
              <React.Fragment>
                <span>
                  Welcome, {authUser.firstName} {authUser.lastName}
                </span>
                <Link to="/signout">Sign Out</Link>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Link className="signup" to="/signup">
                  Sign Up
                </Link>
                <Link className="signin" to="/signin">
                  Sign In
                </Link>
              </React.Fragment>
            )}
          </nav>
        }
        {console.log(context)}
      </div>
    </div>
  );
};

// export default class Header extends React.PureComponent {
//   render() {
//     const { context } = this.props;
//     const authUser = context.authenticatedUser;
//     return (
//       <div className="header">
//         <div className="bounds">
//           <h1 className="header--logo">MyAuth</h1>
//           {
//             <nav>
//               {authUser ? (
//                 <React.Fragment>
//                   <span>
//                     Welcome, {authUser.firstName} {authUser.lastName}
//                   </span>
//                   <Link to="/signout">Sign Out</Link>
//                 </React.Fragment>
//               ) : (
//                 <React.Fragment>
//                   <Link className="signup" to="/signup">
//                     Sign Up
//                   </Link>
//                   <Link className="signin" to="/signin">
//                     Sign In
//                   </Link>
//                 </React.Fragment>
//               )}
//             </nav>
//           }
//           {console.log(context)}
//         </div>
//       </div>
//     );
//   }
// }
