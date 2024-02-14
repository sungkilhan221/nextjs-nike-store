import React from "react";

function ErrorStripe() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Something went wrong...
          </h2>
        </div>
      </div>
    </div>
  );
}

export default ErrorStripe;
