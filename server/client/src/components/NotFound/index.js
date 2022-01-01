import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="container text-center">
      <div className="row d-flex justify-content-center">
        <h3>This page could not be found</h3>
        <div className="col-sm-3 ">
          <Link className="btn btn-primary m-3" to="/signup">
            GO TO HOMEPAGE
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
