"use client";
import { useContractRead } from "@starknet-react/core";
import Balance from "./components/balance";
import Header from "./components/header";
import StudentsTable from "./components/students-table";
import StudentsTableControl from "./components/students-table-control";
import TotalStudents from "./components/total-students";
import { contractAddress, dummyStudents } from "./lib/data";
import { ABI } from "./abis/abi";
import Loading from "./components/loading";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter()
  // TODO - Fetch Students from Contract

  const {
    data: allStudents,
    isLoading: isLoadingStudents,
    refetch: refetchStudents,
    isFetching: isFetchingStudents,
  } = useContractRead({
    functionName: "get_all_students",
    args: [],
    abi: ABI,
    address: contractAddress,
  });

  console.log(allStudents);

  const filterOptionFromURL = searchParams.get("filter") || ""
  // const [filtered, setFiltered] = useState(false)
  const filterStudents = (filterOption) => {
    return allStudents?.filter((student) => {
      if (filterOption === '') {
        return allStudents
      }
      if (filterOption === 'active') {
        return student.is_active === true;
      }
      else if (filterOption === 'inactive') {
        return student.is_active === false
      }
      return true
    })
  }

  const displayedStudents = filterStudents(filterOptionFromURL);

  const handleFilterChange = (e) => {
    const selectedOption = e.target.value
    const newParams = new URLSearchParams(searchParams)

    if (selectedOption === '') {
      newParams.delete("filter");
    } else {
      newParams.set("filter", selectedOption);
    }
    router.push(`?${newParams.toString()}`)
  }


  return (
    <div className="py-[60px] px-[20px] sm:px-[50px] md:px-[100px]">
      <Header />
      {isLoadingStudents || isFetchingStudents ? (
        <Loading message="Fetching students..." />
      ) : (
        <div className="mt-[60px]">
          <div className="flex flex-col sm:flex-row justify-start sm:justify-between sm:items-center">
            {/* TODO: - Pass correct students length */}
            <TotalStudents total={allStudents?.length} />
            <Balance />
          </div>
          {/* TODO: - Pass correct students */}
          <StudentsTable students={allStudents ? displayedStudents : []} />
          {/* TODO: - Pass correct students length */}
          <StudentsTableControl
            count={allStudents ? displayedStudents.length : 0}
            handleRefreshStudents={() => {
              refetchStudents();
              console.log("Handle refetch");
            }}
            handleFilterChange={handleFilterChange}
          />
        </div>
      )}
    </div>
  );
}
