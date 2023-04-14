import React from "react";

const MainLayout = ({children}) => {
  return (
    <div >
      <div className="flex justify-center items-center h-20 bg-teal-500">
        
      </div>
      <div className="m-10">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
