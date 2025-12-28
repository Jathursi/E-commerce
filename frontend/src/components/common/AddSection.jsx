import React from 'react'

function AddSection() {
  return (
    <section className="w-full my-12 bg-slate-900 dark:bg-primary/20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Flash Sale: 24 Hours Only!
          </h2>
          <p className="text-slate-300 text-lg max-w-xl">
            Get an extra 20% off on all electronics. Use code{" "}
            <span className="text-primary font-mono bg-white/10 px-2 py-1 rounded">
              FLASH20
            </span>{" "}
            at checkout.
          </p>
        </div>
        <div className="flex-shrink-0">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 flex flex-col items-center">
            <p className="text-slate-300 text-sm mb-2 uppercase tracking-widest">
              Ends In
            </p>
            <div className="flex gap-4 text-white">
              <div className="text-center">
                <span className="block text-3xl font-bold font-mono">08</span>
                <span className="text-xs text-slate-400">Hours</span>
              </div>
              <span className="text-2xl font-bold">:</span>
              <div className="text-center">
                <span className="block text-3xl font-bold font-mono">45</span>
                <span className="text-xs text-slate-400">Mins</span>
              </div>
              <span className="text-2xl font-bold">:</span>
              <div className="text-center">
                <span className="block text-3xl font-bold font-mono">12</span>
                <span className="text-xs text-slate-400">Secs</span>
              </div>
            </div>
            <button className="mt-6 w-full bg-primary hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition-colors">
              Shop The Sale
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddSection
