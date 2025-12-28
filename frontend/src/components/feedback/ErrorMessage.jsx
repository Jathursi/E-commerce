import React from 'react';

function ErrorMessage({ message }) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mb-4">
          <span className="material-symbols-outlined text-3xl text-red-600 dark:text-red-400">error</span>
        </div>
        <p className="text-lg text-slate-900 dark:text-white font-semibold">Error</p>
        <p className="mt-2 text-slate-600 dark:text-slate-300 text-center max-w-md">{message}</p>
      </div>
    </div>
  );
}

export default ErrorMessage;
