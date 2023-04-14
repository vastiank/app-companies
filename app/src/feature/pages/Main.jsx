import React from "react";
import { useSelector } from "react-redux";
import { SignInSide } from "./login/index";
import ListCompanies from "./companies/ListCompanies";

const Main = () => {
  const { data } = useSelector((state) => state.user);

  return <>{data !== "" ? <ListCompanies /> : <SignInSide />}</>;
};

export default Main;
