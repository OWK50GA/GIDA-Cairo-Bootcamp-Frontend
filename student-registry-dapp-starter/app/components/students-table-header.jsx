import React from "react";

export default function StudentTableHeader() {
  return (
    <div className="grid grid-cols-[4fr_4fr_4fr_4fr_4fr_5fr_4fr] lg:grid-cols-[2fr_2fr_2fr_2fr_2fr_90px_1fr] gap-2 md:gap-auto py-6 px-4 border-b-[#c4c4c4] border-b-[1px] text-[#434446] font-medium text-center sm:text-start">
      <div>ID number</div>
      <div>Surname</div>
      <div>First name</div>
      <div>Phone number</div>
      <div>Age</div>
      <div>Status</div>
      <div>Actions</div>
    </div>
  );
}
