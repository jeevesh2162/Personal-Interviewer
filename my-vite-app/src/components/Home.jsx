
import {React, useContext} from "react";
import { UserContext } from "../useContext";
import "./home.css";

export const Home = () => {
  const { user } = useContext(UserContext); // Access the context

  console.log(user);
  return (
    <main>
       hello {JSON.stringify(user)}, working correctly
      
    </main>
  );
};
