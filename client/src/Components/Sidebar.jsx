import React, { useState } from "react";
import { LuPencil } from "react-icons/lu";
import { MdInbox, MdOutlineDrafts, MdOutlineKeyboardArrowDown, MdOutlineWatchLater } from "react-icons/md";
import { IoMdStar } from "react-icons/io"
import { TbSend2 } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { setOpen } from "../redux/appSlice";

const SidebarItems = [
  {
    icon:<MdInbox size={20}/>,
    text:"Inbox"
  },{
    icon:<IoMdStar size={20}/>,
    text:"Starred"
  },{
    icon:<MdOutlineWatchLater size={20}/>,
    text:"Snoozed"
  },{
    icon:<TbSend2 size={20}/>,
    text:"Sent"
  },{
    icon:<MdOutlineDrafts size={20}/>,
    text:"Drafts"
  },{
    icon:<MdOutlineKeyboardArrowDown size={20}/>,
    text:"More"
  }
]

const Sidebar = () => {
  const [selected, setSelected] = useState(0);

  const dispatch = useDispatch()
  return (
    <div className="w-[19%] h-full">
      <div className="p-3">
        <button onClick={()=> dispatch(setOpen(true))} className=" flex items-center gap-2 bg-[#C2E7FF] p-4 rounded-2xl hover:shadow">
          <LuPencil size={"24px"} />
          Compose
        </button>
      </div>
      <div className="text-gray-600">
          {
            SidebarItems.map((item,index)=>{
              return(
                <div  onClick={function onClick(){setSelected(index)}} className={`  ${selected == index ? "bg-[#D3E3FD] flex items-center pl-6 py-2 rounded-r-full gap-4 my-2 hover:cursor-pointer text-sm text-[#001D35] font-semibold" :"flex items-center pl-6 py-1 rounded-r-full gap-4 my-2 hover:cursor-pointer hover:bg-gray-200 text-sm text-[#1A354D]" }`}>
                   {item.icon}
                <p>{item.text}</p>
              </div>
              )
            })
          } 
        
      </div>
    </div>
  );
};

export default Sidebar;
