import React from 'react'

function Testimonials() {
  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            What Our Customers Say
          </h2>
          <p className="mt-4 text-lg text-slate-500">
            Trusted by thousands of happy shoppers worldwide
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* <!-- Testimonial 1 --> */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 relative">
            <span className="material-symbols-outlined absolute top-6 right-6 text-6xl text-slate-100 dark:text-slate-700 -z-0">
              format_quote
            </span>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <img
                  alt="Sarah J"
                  className="h-12 w-12 rounded-full object-cover"
                  data-alt="Portrait of smiling woman"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBf9I8_tyUbviAorXatCl07Xeu5LpOAgYthbm8y73PlWJsnHjEu-f-Zwu8pfTokHUCgyITKbgFZqEXAlB7r-I0Pl5_iwItg7DeZgtsYH0210miuqTqC2UkwgLOOI2KfpKGukSAkJ35ydSpnDmxOMNOVvCBoahWePsBJL47Wej8kycewXxUohO5tu8lGAVZmESvp6WGYe6-yl4CFFaHCmTj9HOyi6HkANYpNGOl5Z1xA-rdnHiSIOZdnfhcZPJHyPOV6k5A3KZ08mVc"
                />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">
                    Sarah Johnson
                  </h4>
                  <div className="flex text-yellow-400 text-xs">
                    <span className="material-symbols-outlined fill-current text-[16px]">
                      star
                    </span>
                    <span className="material-symbols-outlined fill-current text-[16px]">
                      star
                    </span>
                    <span className="material-symbols-outlined fill-current text-[16px]">
                      star
                    </span>
                    <span className="material-symbols-outlined fill-current text-[16px]">
                      star
                    </span>
                    <span className="material-symbols-outlined fill-current text-[16px]">
                      star
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-300 italic">
                "The quality of the products is outstanding! Shipping was fast
                and the packaging was eco-friendly. Will definitely shop here
                again."
              </p>
            </div>
          </div>
          {/* <!-- Testimonial 2 --> */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 relative">
            <span className="material-symbols-outlined absolute top-6 right-6 text-6xl text-slate-100 dark:text-slate-700 -z-0">
              format_quote
            </span>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <img
                  alt="Michael C"
                  className="h-12 w-12 rounded-full object-cover"
                  data-alt="Portrait of man with glasses"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgWt6YId3ySAvK6GqDx8pH4_qGOyBY33IdgKu8J7qEMXVMZRHzE0GBRZqw_7_WdD7VWiCApZaET6dVrL8k__YJ5uMGBaYI1oOg0y9Z9pqiLbuqVOfA9Un3yaVn-mPNRZHPxlWZrfoqS8mFQDRfFqB7TfdneboNRpAaT_5Ygve-_iHW5H7FqT-5_kuqe1FN6qaerkJTY0njyr-LiYeuiuT2AyhzFdM3QGJ0oqjX2ymAA6u88dbgBvp_lKpsD2qvOZiMXyDMiv6EKYY"
                />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">
                    Michael Chen
                  </h4>
                  <div className="flex text-yellow-400 text-xs">
                    <span className="material-symbols-outlined fill-current text-[16px]">
                      star
                    </span>
                    <span className="material-symbols-outlined fill-current text-[16px]">
                      star
                    </span>
                    <span className="material-symbols-outlined fill-current text-[16px]">
                      star
                    </span>
                    <span className="material-symbols-outlined fill-current text-[16px]">
                      star
                    </span>
                    <span className="material-symbols-outlined fill-current text-[16px]">
                      star
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-300 italic">
                "I love the clean design of the website, it makes shopping so
                easy. Found exactly what I needed for my home office setup."
              </p>
            </div>
          </div>
          {/* <!-- Testimonial 3 --> */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 relative">
            <span className="material-symbols-outlined absolute top-6 right-6 text-6xl text-slate-100 dark:text-slate-700 -z-0">
              format_quote
            </span>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <img
                  alt="Emily D"
                  className="h-12 w-12 rounded-full object-cover"
                  data-alt="Portrait of young woman"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDH_dLFqnkTn7Cok0X5B3Jq-KAa-wgZxOhi9gCtCW6Y_WnhOY6oPpW4sN2fjokwltUGi_CdelOciFDaBkgS-yxHPUjqpgtQ6jUK-48UNVMJn0C5gdKYMyYJ9ZFL8v9ulBfrx9mrSUz9RD9rqT7xnAQRotgTj-cbd32RLex0NQX4VGVAo8Qc6wgniKoS301TMmnqxkrM5onASwh6vD03SdPE-qM_H_O1en6aQkEXpPtaCLT-sbmUCdh924Th6fhYZdwXbE7x4aJHxxI"
                />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">
                    Emily Davis
                  </h4>
                  <div className="flex text-yellow-400 text-xs">
                    <span className="material-symbols-outlined fill-current text-[16px]">
                      star
                    </span>
                    <span className="material-symbols-outlined fill-current text-[16px]">
                      star
                    </span>
                    <span className="material-symbols-outlined fill-current text-[16px]">
                      star
                    </span>
                    <span className="material-symbols-outlined fill-current text-[16px]">
                      star
                    </span>
                    <span className="material-symbols-outlined text-slate-300 text-[16px]">
                      star
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-300 italic">
                "Customer service was incredibly helpful when I needed to
                exchange a size. The process was smooth and hassle-free."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials
