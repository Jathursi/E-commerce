import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import { FaPercent } from "react-icons/fa";

function HeroSection() {
  return (
    <section className="relative w-full py-8 md:py-12 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="@container">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-16">
          <div className="flex flex-col items-start gap-6 lg:w-1/2 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-primary text-xs font-bold uppercase tracking-wide">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              New Season
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-slate-900 dark:text-white">
              Summer Collection <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                2024
              </span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-lg leading-relaxed">
              Discover the latest trends in fashion with our exclusive summer
              collection. Up to 50% off on selected items. Upgrade your wardrobe
              today.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button className="bg-primary hover:bg-blue-600 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-1 active:translate-y-0 flex items-center gap-2">
                Shop Now
                <span className="material-symbols-outlined text-[20px]">
                  <FaArrowRight />
                </span>
              </button>
              <button className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700 px-8 py-3.5 rounded-xl font-bold transition-all">
                View Lookbook
              </button>
            </div>
            <div className="flex items-center gap-4 pt-4 text-sm text-slate-500 dark:text-slate-400 font-medium">
              <div className="flex -space-x-2">
                <img
                  alt="Customer avatar"
                  className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 object-cover"
                  data-alt="Small avatar of a smiling woman"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGRwDkP7yrwdVXg0zmea9xuhy8L1nTBPLjFHTaB1D0oov6MUNNo3VZTH2rcTpOCDwdKOEUKs4Dg9yugK8TLEz-EksdjnNE0txNd0YYwTns4hQGTGmCAkB4qY0T9elTqoJEsEg_h8lPyu36tZasDW-jXglKzUhhZHV0GiMWAaF2lYAdrCERJzrOQ-HKTajAg98eB67QBdr7igcsU5Peju3vCDiujPpLDmh0BZzXdchz2L0GB8RM7v9QDLAF_CgCqx3_hO0FD41zhBE"
                />
                <img
                  alt="Customer avatar"
                  className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 object-cover"
                  data-alt="Small avatar of a man"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWWkEOJ3XAZFQNlfR4OenqWDRUU2eGN-V0z75dXooBzqUMh9UdUDftMNapoBvZ7QAL8f1xXiXp8TSMA3DyV_DdEMHBYxQJls_P8gdx1luSzx9p3Wb2-9HDTOjCz8t2xuSMSMvTRzXFN1F23uJghFWUaJL5164uriZHS2OGlXbZNiNmKkpplgas1XuszFf4hdeLamFjNeiw-swmkBmzGrtH2iVknBTa6K5t6JVZOuHyW8Yb7LczypVPXNxdxOrHu9SWtvVli9ruvf0"
                />
                <img
                  alt="Customer avatar"
                  className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 object-cover"
                  data-alt="Small avatar of a smiling man"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCC0nN1UxvewODGENKGTpcbKGvzRwwHEIKbxIBSXM-YkXJ0Brd5bUjipkiYANSNUowpVkeGONqhHwIkUPHAgcqANoIAhjtxgdSSmYompsP4CcmO-Gm50lG2vdTv-TbAoZ8flvxryHdOiv9Bj5YRSG_c9l6s79emseCNdrDn8nm3well9yz2fkEiZoINwMN4m0t2PlfKVqcd47ViT-qRI-gkYrfxGZBEKabHiFrTs2WgkrLz0aAOVbsQrZg7H-96QKBMwxAG6zQD04"
                />
              </div>
              <span>Trusted by 10k+ customers</span>
            </div>
          </div>
          <div className="w-full lg:w-1/2 relative group perspective-1000">
            {/* <!-- Decorative background blob --> */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-full blur-3xl opacity-70 -z-10"></div>
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-slate-900/5 dark:ring-white/10 transform transition-transform duration-500 hover:scale-[1.01]">
              <img
                alt="Woman carrying shopping bags"
                className="w-full h-full object-cover"
                data-alt="Fashion model woman holding shopping bags walking"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9U_xNmFPzRJdMiclhDmY4DgpMjuc5eQMUNoEs-N5DkqFPdZYOIllk6OcM9QllQ0VHvvSaJ7Kzoipje_GVpY7uEtMRibEMs5mAeu_WMfyoruhSiiT9nJT8G8NaK-rTsss3S9n7hwwoAvrxvYXTPzT8WhmppT7EcEO4l-evJgPh7wF_3NA91wVSsts_kxqAAUFtiYb13lo_LB9c1O2I7AWq3lNy1Pc2qy_8HQFGUBDyfEBVP0-3_KvCNRrjQmsRWluUtH57si4SQpg"
              />
              {/* <!-- Floating Card Overlay --> */}
              <div className="absolute bottom-6 left-6 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm p-4 rounded-xl shadow-lg max-w-[200px] hidden sm:block animate-fade-in-up">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center text-red-600">
                    <span className="material-symbols-outlined"><FaPercent /></span>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-semibold">
                      Special Offer
                    </p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      Summer Sale
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection
