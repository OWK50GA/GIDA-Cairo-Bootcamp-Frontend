"use client";
import { felt252ToString } from "../lib/helpers";
import CheckIcon from "../svg/CheckIcon";
import TrashIcon from "../svg/TrashIcon";
import XmarkIcon from "../svg/XmarkIcon";
import { DeleteControl } from "./delete-control";
import EditControl from "./edit-control";

// export function IsActive () {
//   return (
//     <div>
      
//     </div>
//   );
// }

export default function StudentTableRow({ student }) {
  if (!student) return null;
  //TODO: Implement delete student Functionality

  return (
    <div className="items-center grid gap-8 md:gap-auto grid-cols-[40px_40px_40px_70px_10px_25px_40px] sm:grid-cols-[50px_60px_50px_90px_10px_25px_40px] lg:grid-cols-[2fr_2fr_2fr_2fr_2fr_90px_1fr] py-6 px-4 text-[#6F6F6F] font-normal capitalize">
      <div>{student.id.toString()}</div>
      <div>{felt252ToString(student.lname)}</div>
      <div>{felt252ToString(student.fname)}</div>
      <div>{`0${student.phone_number.toString()}`}</div>
      <div>{student.age.toString()}</div>
      <div className="flex">
        <div className={`rounded-full text-white ${student.is_active ? "bg-[#34C759]":"bg-[#FF3B30]"}`}>
          {student.is_active === true? <CheckIcon /> : <XmarkIcon />}
        </div>
      </div>
      <div className="flex gap-x-4 justify-center items-center">
        <EditControl student={student} />
        <button className="text-[#7A0012]">
          <DeleteControl student={student}/>
        </button>
      </div>
    </div>
  );
}
