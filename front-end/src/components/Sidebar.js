import React from "react";
import Button from "./Button";
import SidebarLink from "./SidebarLink";
import {BiMessageDetail} from "react-icons/bi";
import {FaSignOutAlt} from "react-icons/fa";
import {CgProfile} from "react-icons/cg";


const SIDEBAR_DATA = [
  {
    'title': 'Lorem ipsum dolor sit amet',
    'icon': <BiMessageDetail className="h-4 w-4"/>
  },
  {
    'title': 'Lorem ipsum dolor sit amet',
    'icon': <BiMessageDetail className="h-4 w-4"/>
  },
  {
    'title': 'Lorem ipsum dolor sit amet',
    'icon': <BiMessageDetail className="h-4 w-4"/>
  },
  {
    'title': 'Lorem ipsum dolor sit amet',
    'icon': <BiMessageDetail className="h-4 w-4"/>
  },
  {
    'title': 'Lorem ipsum dolor sit amet',
    'icon': <BiMessageDetail className="h-4 w-4"/>
  },


]

const Sidebar = (props) => {
  return (
    <div
      className="bg-gunmetal-900 flex flex-col h-full gap-y-2 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] z-30 px-2 py-4"
      style={props.style}
    >
      <Button className="mx-1 bg-transparent hover:bg-silver hover:bg-opacity-20 transition-all text-left py-3 border-silver border-2 mb-2">+ Add new Chat</Button>
      <div className="h-full flex-1 overflow-y-auto scrollbar-thumb-gunmetal-700 scrollbar-thin scrollbar-track-none">
        <div className="flex flex-col gap-y-2">
          {
            SIDEBAR_DATA.map((data) => <SidebarLink title={data.title} icon={data.icon}/>)
          }
        </div>
      </div>
      <div className="w-full border-t-2 border-silver-300"></div>
      <SidebarLink title="Sign out" icon={<FaSignOutAlt />}/>
      <SidebarLink title="Profile" icon={<CgProfile />}/>
    </div>
  );
};

export default Sidebar;
