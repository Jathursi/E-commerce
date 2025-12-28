import React from 'react'

function NewProductCard() {
  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          New Arrivals
        </h2>
        <div className="flex gap-2">
          <button className="p-2 rounded-full border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined text-lg">
              arrow_back
            </span>
          </button>
          <button className="p-2 rounded-full border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined text-lg">
              arrow_forward
            </span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* <!-- Product Card 5 --> */}
        <div className="group flex flex-col bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-slate-100 dark:border-slate-700/50">
          <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-700">
            <img
              alt="Iphone"
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
              data-alt="Modern smartphone back view"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJuCZzWBp-A_4Bfw8ZDmcSf4tjS5pfVbezeiswy69lnrTvpdXaewCDACwjCyxGU4a4f114lrFhaOrS5KEqYkRimuYMmsIQTcRARZu9Sz6-QsjWb2hJOHI1BTHqtOx39uuc7mIJzHBv9bkswdsY4tJ-HybodobM_2kKLzbJv3tdJZPIyWhep2X3DtCi85JICqLT-nGOsC18rkSPThQgy-wDbv1AkN6bU0US8J16rBzsJ9aYUdCImcnEksS39g6F9YAl3V_uRPsk-GU"
            />
            <button className="absolute bottom-3 right-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-2.5 rounded-full shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary hover:text-white">
              <span className="material-symbols-outlined text-[20px]">
                add_shopping_cart
              </span>
            </button>
          </div>
          <div className="p-4 flex flex-col flex-1">
            <p className="text-xs text-slate-500 mb-1">Mobile</p>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1 line-clamp-1">
              Smartphone Pro Max
            </h3>
            <div className="mt-auto flex items-center justify-between pt-2">
              <span className="font-bold text-lg text-primary">$999.00</span>
            </div>
          </div>
        </div>
        {/* <!-- Product Card 6 --> */}
        <div className="group flex flex-col bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-slate-100 dark:border-slate-700/50">
          <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-700">
            <img
              alt="Sunglasses"
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
              data-alt="Stylish sunglasses on sand"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJS_fNGbecdr7iiCtE4XUJe_2fBnzPKcodHzYIoSd2O3sKSdSYRZBaiOx2pOo44lY_F6zKH0MOMwGZ3WD1ZODhhip1ljd-TGbKtEkGSzrKZALcSjVOPpEopoAbsSR-6zstxlX4hymAyx2wzy8cVNh_xBjs9XsPbLFsKuEwyyQqbs4rHlcIXTC67RMa1KCNc7c7KCYGFz2nJzuO-QYtt45SQGrpxQYFjV_lqqKwU31g-lnG4KarMZ5pDgS0MEPaQE7FnoLVTq2FkCc"
            />
            <button className="absolute bottom-3 right-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-2.5 rounded-full shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary hover:text-white">
              <span className="material-symbols-outlined text-[20px]">
                add_shopping_cart
              </span>
            </button>
          </div>
          <div className="p-4 flex flex-col flex-1">
            <p className="text-xs text-slate-500 mb-1">Accessories</p>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1 line-clamp-1">
              Summer Shades
            </h3>
            <div className="mt-auto flex items-center justify-between pt-2">
              <span className="font-bold text-lg text-primary">$59.00</span>
            </div>
          </div>
        </div>
        {/* <!-- Product Card 7 --> */}
        <div className="group flex flex-col bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-slate-100 dark:border-slate-700/50">
          <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-700">
            <img
              alt="Backpack"
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
              data-alt="Green outdoor backpack"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuATnWeJB1XCNok62qLtRKDiwJz06wfstIVhr2nGYxTOFYeqx5ClfLrdqYyxKUykAUwMQb0U1lAoPOfcloG-zcVaQXPzmhDqdgY1R0u7By1m_PX8SDkyECVmWWohqKHi8LunjCxaG6RPtMa_EfELL4NjdzN5QKV3nt4nbXClmTLYk-r-52b8MyUKoQWnRDgmP8s5RLAxSO36kYHqdXNIiE34vR3gdmgTWaYR7K8-_bTMZI0Sr72hyBbFAXzXAr4Oav9Q3MtR-uQin0g"
            />
            <button className="absolute bottom-3 right-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-2.5 rounded-full shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary hover:text-white">
              <span className="material-symbols-outlined text-[20px]">
                add_shopping_cart
              </span>
            </button>
          </div>
          <div className="p-4 flex flex-col flex-1">
            <p className="text-xs text-slate-500 mb-1">Travel</p>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1 line-clamp-1">
              Explorer Backpack
            </h3>
            <div className="mt-auto flex items-center justify-between pt-2">
              <span className="font-bold text-lg text-primary">$79.99</span>
            </div>
          </div>
        </div>
        {/* <!-- Product Card 8 --> */}
        <div className="group flex flex-col bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-slate-100 dark:border-slate-700/50">
          <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-700">
            <img
              alt="Smart Watch"
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
              data-alt="Close up of smart watch"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkK4AdAoHbXbkC_Kx478vfc36_jBjpr0Tmtw6c0z5g8PzLwlw4t_48JO2VnlgUftt2kcl0qEIWzOOdA1FqULRZf-HTn5Rx1Uzr3hHEr2FTdcFjhT8scoVJ1T6Qi4gAswpcjX5rRdEg7IaugPW-mIfmzdZqr0Q8f1OkmsZpU9R1AhW71WS9-P5U913BQWmwlIxS9xIHBc9EmJLs3k9UzBSV81UjsNSrz5DcdgPFsxaHijVJ1Kww0dixyfeLQJ7Vcu6G3429JvzfmIU"
            />
            <button className="absolute bottom-3 right-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-2.5 rounded-full shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary hover:text-white">
              <span className="material-symbols-outlined text-[20px]">
                add_shopping_cart
              </span>
            </button>
          </div>
          <div className="p-4 flex flex-col flex-1">
            <p className="text-xs text-slate-500 mb-1">Tech</p>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1 line-clamp-1">
              Series 7 Watch
            </h3>
            <div className="mt-auto flex items-center justify-between pt-2">
              <span className="font-bold text-lg text-primary">$399.00</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewProductCard
