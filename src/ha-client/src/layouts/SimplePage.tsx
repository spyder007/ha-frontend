import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AlertMessageList } from "../components/AlertMessageList/AlertMessageList";
import { Footer } from "../components/Footer/Footer";
import { NavMenu } from "../components/NavMenu/NavMenu";
import { useAuth } from "../context";

interface SimpleProps {
  isPrivate?: boolean;
}

export const SimplePage: React.FC<SimpleProps> = (props) => {
  const { isAuthenticated } = useAuth();
  
  const layout = (
    <React.Fragment>
      <NavMenu />
      <div className="container">
        <AlertMessageList />
        <Outlet />
      </div>
      <Footer />
    </React.Fragment>
  );

  if (props.isPrivate && !isAuthenticated) {
    return ( 
          <Navigate to={"/"} />
    );
  } else {
    return layout;
  }
};
