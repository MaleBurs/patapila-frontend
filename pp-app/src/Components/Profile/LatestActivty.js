import React, { useEffect } from "react";
import { useState } from 'react'
import ActServices from "../../services/activities.service";
import AuthService from "../../services/auth.service";

const LatestActivity = () => {
  const currentUser = AuthService.getCurrentUser();
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    ActServices.getUserLatesActivities(currentUser.id).then(
      (res)=> setActivities(res.data)
    )
}, [currentUser.id])
  return (
    <>
    <div className="border bg-white  rounded-md">
      <div className="px-8 md:px-6 lg:px-8 mb-4 rounded-lg py-5">
        <div className="pb-3 text-sm md:text-base font-Pop-M text-gray-800 border-b border-gray-200">Última Actividad</div>
        <ol className="relative border-l border-gray-400 mt-5 flex flex-col space-y-5">
          {activities.map((activity) => (
                <>
                <li key={activity.text} className="">
                  <span className="flex absolute -left-1.5 justify-center items-center w-3 h-3 rounded-full ring-4 ring-white bg-gray-400"/>
                  <div className="text-gray-700 flex flex-row items-center justify-between border border-gray-300 rounded-lg py-2 px-2 lg:px-3 ml-3 lg:ml-5">
                      <div className="basis-3/4 flex flex-col">
                      <div className="text-xs font-Pop-B">{activity.title}</div>
                      <div className="text-xs font-Pop-R">{activity.description}</div>
                      </div>
                      <div className="text-xs font-Pop-L">{activity.createdAt.split('T')[0]}</div>
                  </div>
                </li>
                </>
            ))} 
        </ol>
      </div>
    </div>
   </>
  );
};
export default LatestActivity;