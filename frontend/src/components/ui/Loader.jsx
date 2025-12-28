import React from 'react';

function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-primary rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-600 dark:text-slate-300">Loading products...</p>
      </div>
    </div>
  );
}

export default Loader;
