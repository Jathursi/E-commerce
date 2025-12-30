import React from 'react';

function EmptyState({ message = "No items found", icon = "📦" }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
        {message}
      </h3>
      <p className="text-slate-600 dark:text-slate-400 text-center max-w-md">
        Try adjusting your filters or search criteria
      </p>
    </div>
  );
}

export default EmptyState;
