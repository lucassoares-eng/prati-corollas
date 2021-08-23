import React from "react";
import { ExclamationCircleIcon } from "@heroicons/react/outline"

type AlertType = {
  showAlert?: React.Dispatch<boolean>,
  color: string,
  msg: string
}

export default function Alert ({ showAlert, color, msg }:AlertType) {
  return (
    <div className={"text-white px-6 py-4 border-0 flex items-center rounded relative mb-4 bg-" + color + "-500"}>
      <span className="text-xl inline-block mr-3 align-middle">
        <i className="fas fa-bell" />
        <ExclamationCircleIcon className="h-6 w-6" aria-hidden="true"/>
      </span>
      <span className="inline-block align-middle mr-8 break-words">
        { msg }
      </span>
      <>
        {showAlert? (
          <button className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none" onClick={() => showAlert(false)}>
              <span>×</span>
          </button>
        ): null}
      </>
    </div>
  );
};