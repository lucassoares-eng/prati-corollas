import React from "react";
import { ExclamationCircleIcon } from "@heroicons/react/outline"

export default function Alert ({ showAlert, color, msg }) {
  return (
    <div
      className={"text-white px-6 py-4 border-0 rounded relative mb-4 bg-" + color + "-500"}>
      <span className="text-xl inline-block mr-3 align-middle">
        <i className="fas fa-bell" />
        <ExclamationCircleIcon className="h-6 w-6" aria-hidden="true"/>
      </span>
      <span className="inline-block align-middle mr-8">
        { msg }
      </span>
      <button className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none" onClick={() => showAlert(false)}>
          <span>×</span>
      </button>
    </div>
  );
};