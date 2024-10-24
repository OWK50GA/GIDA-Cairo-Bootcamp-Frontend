import { useMemo, useRef, useState } from "react";
import TrashIcon from "../svg/TrashIcon";
import CloseIcon from "../svg/CloseIcon";
import { useAccount, useContract, useContractWrite, useWaitForTransaction } from "@starknet-react/core";
import { ABI } from "../abis/abi";
import { contractAddress } from "../lib/data";
import { CallData } from "starknet";
import { HashLoader } from "react-spinners";

export const DeleteControl = ({ student }) => {
    const deletStudentPopover = useRef(null);

    // Get user (Address)
    const { address: user } = useAccount()

    // Form State eValues
    const [isChecked, setIsChecked] = useState(false)

    // Submit Event Handler
    const handleSubmit = async (event) => {
        event.preventDefault();
        writeAsync()
    };

    // Initialize Contract
    const { contract } = useContract({
        abi: ABI,
        address: contractAddress,
    })

    // get student index
    const index = parseInt(student.id)

    // calls array
    const calls = useMemo(() => {
        const isInputValid = isChecked

        if (!isInputValid) {
            console.log('box not checked')
            return
        }

        return contract.populateTransaction["delete_student"](
            CallData.compile([index])
        );
    }, [contract, user, index, isChecked])

    const {
        writeAsync,
        data: deleteData,
        isPending: deleteWriteIsPending,
    } = useContractWrite({
        calls
    })

    const { 
        data: deleteWaitData,
        isLoading: deleteWaitIsLoading,
     } = useWaitForTransaction({
        hash: deleteData?.transaction_hash,
        watch: true
    })

    // Loading State
  const LoadingState = ({ message }) => (
    <div className="flex items-center space-x-2">
      <HashLoader size={16} color="#ffffff" />
      <span>{message}</span>
    </div>
  );
  const buttonContent = () => {
    if (deleteWriteIsPending) {
      return <LoadingState message="Sending" />;
    }

    if (deleteWaitIsLoading) {
      return <LoadingState message="Waiting for confirmation" />;
    }

    if (deleteWaitData && deleteWaitData.status === "REJECTED") {
      return <LoadingState message="Transaction rejected" />;
    }

    if (deleteWaitData) {
      return "Transaction confirmed";
    }

    return "Delete Student";
  };

    return (
        <>
            <button
            // className="text-[#5B9EF7]"
            onClick={() => deletStudentPopover.current?.showModal()}
            >
            <TrashIcon />
            </button>

            <dialog
            ref={deletStudentPopover}
            className="overflow-hidden rounded-[12px] bg-white lg:rounded-[24px]"
            >
            <form className="py-6 transition-all duration-500 ease-linear px-[26px] bg-white flex flex-col gap-y-6 border-[#F2F2F2] border-solid border-[1px] w-[557px] h-fit rounded-lg shadow-md text-sm leading-5">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">Delete Student</h2>
                    <button
                        className=""
                        onClick={() => deletStudentPopover.current?.close()}
                    >
                        <CloseIcon />
                    </button>
                </div>
                <div className="flex justify-center gap-x-3 text-[#6F6F6F]">
                    <label>
                        Are you sure you want to delete this student?
                    </label>
                    <input 
                        type="checkbox" 
                        checked={isChecked}
                        id="delete_student" 
                        onChange={(e) => {
                            setIsChecked(e.target.checked)
                            console.log(e.target.checked)
                        }}
                    />
                </div>
                <button
                className="w-full py-3 bg-[#5B9EF7] rounded-2xl text-base flex justify-center items-center leading-6 font-medium text-[#F9F9F9] mt-2 disabled:cursor-not-allowed disabled:bg-opacity-85"
                disabled={isChecked === false}
                onClick={handleSubmit}
                >
                {buttonContent()}
                {/* Delete Student */}
                </button>
            </form>
            </dialog>
        </>
    );
}
