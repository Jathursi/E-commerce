import React from "react";

function Footer() {
  return (
    <footer className="bg-white dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 pt-16 pb-8 text-slate-600 dark:text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* <!-- Column 1 --> */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="size-6 text-primary bg-primary/10 rounded flex items-center justify-center">
                <span className="material-symbols-outlined text-sm text-primary">
                  shopping_bag
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                ShopLogo
              </h3>
            </div>
            <p className="text-sm leading-relaxed">
              Your one-stop destination for modern lifestyle products. Quality
              meets affordability in every item we curate.
            </p>
            <div className="flex gap-4 mt-2">
              <a className="hover:text-primary transition-colors" href="#">
                <span className="material-symbols-outlined">public</span>
              </a>
              <a className="hover:text-primary transition-colors" href="#">
                <span className="material-symbols-outlined">
                  alternate_email
                </span>
              </a>
              <a className="hover:text-primary transition-colors" href="#">
                <span className="material-symbols-outlined">rss_feed</span>
              </a>
            </div>
          </div>
          {/* <!-- Column 2 --> */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6">
              Company
            </h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  About Us
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Careers
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Press
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Affiliates
                </a>
              </li>
            </ul>
          </div>
          {/* <!-- Column 3 --> */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6">
              Support
            </h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Help Center
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Terms of Service
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Legal
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          {/* <!-- Column 4 --> */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6">
              Stay Updated
            </h4>
            <p className="text-sm mb-4">
              Subscribe to our newsletter for the latest updates and exclusive
              offers.
            </p>
            <form className="flex flex-col gap-2">
              <input
                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-primary focus:border-primary text-sm"
                placeholder="Enter your email"
                type="email"
              />
              <button
                className="bg-primary hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors"
                type="button"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">© 2024 ShopLogo. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <img
              alt="Visa"
              className="h-4 opacity-50 grayscale hover:grayscale-0 transition-all"
              data-alt="Visa Logo"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtm_sdUgs5znL7oATjL0KeMgREmNa_kU0hpLaZYbY8vy2C6jJINUXaDTBCbzs1EpUBokJcr10b-3FMJi5Rua4jN_PGV-oJ50CNW5PUnWuTEncOwQawiBc_mmiBrn3Epej_z6hBIefy-iNleIo2-UTVZINss5QzLkxbSLabDti7-jHACapuLbNp9_FGFBGkGEgZI-WKsifghrzwkrGtEBC6OKcQa5jn7koM3TyOHLmaFV3kJkGOFjWlsvktRIVioRkORotkO5773Xs"
            />
            <img
              alt="Mastercard"
              className="h-6 opacity-50 grayscale hover:grayscale-0 transition-all"
              data-alt="Mastercard Logo"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2n_HekO_1ez2I16NP0DCM5VS8obrm-8FILV5PrVoVW73p1fpgzbMEDlyUmOvpIj5d26Hc2eEE7Ay0zojXPWAOkjsHYbth0yjjf3nWIkOtPGy68u6hrs0r6je83RRByC8hkY_gtCS8YTmswGd5ulyYa5Y4IRJRkfSwbwdm_aAKXt0QTd8SPaOvF9yWYiooC2eoFCNJn43MYyLaBqRbVKWVaCkhnsP3Tmn-7-oj0FiCmj3IRqjYe2vcytMRaM-sfQwBYXaKn0bQik0"
            />
            <img
              alt="Paypal"
              className="h-5 opacity-50 grayscale hover:grayscale-0 transition-all"
              data-alt="Paypal Logo"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCT8Cbwl3OVu4Eexwsk2ajZQVbLPHUtwz8dPgYBXlVH-Yj6vWWNy8IFNKnBls2j41dBxkJyab4MxD5I9Lzfzch063J9gbhnCia_cGqUmC8AbP1thISzvVEWaOzGhtxZAGObQoO6xpq7IYhvmlSNQEITB8WHMiLhcVY-nw5W5GRI5HzUMQu71vdnHntevrlGiFvC8nDDrusg9jgsxKI1QozBRnm-RPg111LvgcuKLPHB6CVu5Hpm0PXHPc2VqCvjzIrCG4Rq72W7KuQ"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
