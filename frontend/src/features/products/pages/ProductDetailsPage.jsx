import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import http from '../../../services/http.service';
import Loader from '../../../components/ui/Loader';
import ErrorMessage from '../../../components/feedback/ErrorMessage';

function ProductDetailsPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await http.get(`/products/${productId}`);
        const productData = data?.data || data?.product || data;
        setProduct(productData);

        const firstImage = (productData?.images || [])
          .map((img) => img?.url || img)
          .find(Boolean);
        setSelectedImage(firstImage || '');
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to load product');
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const imageList = (product?.images || [])
    .map((img) => img?.url || img)
    .filter(Boolean);

  const displayImage = selectedImage || imageList[0] || 'https://via.placeholder.com/800';
  const formattedPrice = product?.price ? product.price.toFixed(2) : '0.00';
  const originalPrice = product?.offer
    ? (product.price / (1 - product.offer / 100)).toFixed(2)
    : null;
  const ratingValue = Number(product?.rating || 0);
  const reviewsCount = product?.reviewsCount || product?.numReviews || 0;
  const categoryName = product?.categories?.[0]?.name || product?.category?.name || 'Shop';
  const inStock = product?.inStock !== false;

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!product) return <ErrorMessage message="Product not found" />;

  return (
    <main className="flex-grow pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="flex mb-8">
          <ol className="inline-flex items-center space-x-1 md:space-x-3 text-sm text-slate-500 dark:text-slate-400">
            <li className="inline-flex items-center">
              <a className="hover:text-primary dark:hover:text-white transition-colors" href="#">
                Home
              </a>
            </li>
            <li>
              <div className="flex items-center">
                <span className="material-symbols-outlined text-slate-400 text-lg mx-1">chevron_right</span>
                <a className="hover:text-primary dark:hover:text-white transition-colors" href="#">
                  {categoryName}
                </a>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <span className="material-symbols-outlined text-slate-400 text-lg mx-1">chevron_right</span>
                <span aria-current="page" className="text-slate-900 dark:text-white font-medium">
                  {product?.name || 'Product Details'}
                </span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="flex flex-col gap-6">
            <div className="relative aspect-square w-full bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm group">
              {product?.offer ? (
                <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider z-10 shadow-lg">
                  -{product.offer}% Discount
                </span>
              ) : null}
              <img
                alt={product?.name || 'Product image'}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                src={displayImage}
              />
              <button className="absolute bottom-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur text-slate-900 dark:text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">zoom_in</span>
              </button>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {imageList.slice(0, 4).map((image, index) => {
                const isActive = image === displayImage;
                return (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => setSelectedImage(image)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 ${
                      isActive
                        ? 'border-primary ring-2 ring-primary/20'
                        : 'border-transparent hover:border-slate-300 dark:hover:border-slate-600'
                    } transition-colors bg-slate-100 dark:bg-slate-800`}
                  >
                    <img
                      alt={`${product?.name || 'Product'} view ${index + 1}`}
                      className={`w-full h-full object-cover ${
                        isActive ? '' : 'opacity-80 hover:opacity-100'
                      }`}
                      src={image}
                    />
                  </button>
                );
              })}
              {imageList.length === 0 && (
                <button className="aspect-square rounded-xl overflow-hidden border-2 border-transparent bg-slate-100 dark:bg-slate-800 flex items-center justify-center cursor-default">
                  <span className="text-xs text-slate-400">No images</span>
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-6 mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
                {product?.name || 'Product Name'}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center text-yellow-400 gap-0.5">
                  {[0, 1, 2, 3, 4].map((index) => (
                    <span
                      key={index}
                      className={`material-symbols-outlined text-[20px] ${
                        ratingValue >= index + 1
                          ? 'fill-current'
                          : 'text-slate-300 dark:text-slate-600'
                      }`}
                    >
                      star
                    </span>
                  ))}
                </div>
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-primary cursor-pointer transition-colors underline decoration-slate-300 underline-offset-4">
                  {reviewsCount} Reviews
                </span>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    inStock
                      ? 'bg-green-50 text-green-700 border border-green-100'
                      : 'bg-red-50 text-red-700 border border-red-100'
                  }`}
                >
                  {inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-end gap-3 mb-2">
                <span className="text-4xl font-bold text-primary">${formattedPrice}</span>
                {originalPrice && (
                  <span className="text-xl text-slate-400 line-through mb-1">${originalPrice}</span>
                )}
              </div>
              <p className="text-sm text-slate-500">Includes all taxes. Free shipping available.</p>
            </div>

            <div className="mb-8">
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                {product?.description ||
                  'This item is ready for your cart. Add it now to see full details and specifications.'}
              </p>
            </div>

            <div className="space-y-6 mb-8">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="font-semibold text-slate-900 dark:text-white">Select Size</label>
                  <button className="text-sm text-primary hover:underline">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button className="w-12 h-12 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center font-medium hover:border-primary hover:text-primary transition-all bg-white dark:bg-slate-800 text-slate-900 dark:text-white">
                    7
                  </button>
                  <button className="w-12 h-12 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center font-medium hover:border-primary hover:text-primary transition-all bg-white dark:bg-slate-800 text-slate-900 dark:text-white">
                    8
                  </button>
                  <button className="w-12 h-12 rounded-lg border-2 border-primary flex items-center justify-center font-bold text-primary bg-primary/5 transition-all">
                    9
                  </button>
                  <button className="w-12 h-12 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center font-medium hover:border-primary hover:text-primary transition-all bg-white dark:bg-slate-800 text-slate-900 dark:text-white">
                    10
                  </button>
                  <button className="w-12 h-12 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center font-medium text-slate-300 cursor-not-allowed bg-slate-50 dark:bg-slate-900">
                    11
                  </button>
                </div>
              </div>
              <div>
                <label className="block font-semibold text-slate-900 dark:text-white mb-2">Quantity</label>
                <div className="flex items-center w-max border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800">
                  <button className="p-3 text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
                    <span className="material-symbols-outlined text-lg">remove</span>
                  </button>
                  <input
                    className="w-12 text-center border-0 bg-transparent focus:ring-0 p-0 text-slate-900 dark:text-white font-semibold"
                    readOnly
                    type="number"
                    value="1"
                  />
                  <button className="p-3 text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
                    <span className="material-symbols-outlined text-lg">add</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button className="flex-1 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold py-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">shopping_cart</span>
                Add to Cart
              </button>
              <button className="flex-1 bg-primary text-white font-bold py-4 rounded-xl hover:bg-blue-600 shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">flash_on</span>
                Buy Now
              </button>
            </div>

            <div className="space-y-4 border-t border-slate-200 dark:border-slate-800 pt-6">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm text-primary">
                  <span className="material-symbols-outlined">local_shipping</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">Free Delivery</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Free standard delivery on orders over $50. Estimated delivery: June 24 - June 26.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm text-primary">
                  <span className="material-symbols-outlined">assignment_return</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">Return Policy</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Worry-free 30 day return policy. Money back guarantee if item is returned in original condition.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 border-t border-slate-200 dark:border-slate-800 pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4 space-y-8">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Customer Reviews</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-5xl font-black text-slate-900 dark:text-white">{ratingValue.toFixed(1)}</span>
                  <div className="flex flex-col">
                    <div className="flex text-yellow-400 text-sm">
                      <span className="material-symbols-outlined fill-current text-[18px]">star</span>
                      <span className="material-symbols-outlined fill-current text-[18px]">star</span>
                      <span className="material-symbols-outlined fill-current text-[18px]">star</span>
                      <span className="material-symbols-outlined fill-current text-[18px]">star</span>
                      <span className="material-symbols-outlined fill-current text-[18px]">star_half</span>
                    </div>
                    <span className="text-sm text-slate-500">Based on {reviewsCount} reviews</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {[{ label: '5', pct: '70%' }, { label: '4', pct: '20%' }, { label: '3', pct: '5%' }, { label: '2', pct: '2%' }, { label: '1', pct: '3%' }].map((row) => (
                  <div key={row.label} className="flex items-center gap-3 text-sm">
                    <span className="w-3 font-medium text-slate-600 dark:text-slate-400">{row.label}</span>
                    <span className="material-symbols-outlined text-[14px] text-yellow-400 fill-current">star</span>
                    <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-400" style={{ width: row.pct }}></div>
                    </div>
                    <span className="w-8 text-right text-slate-400">{row.pct}</span>
                  </div>
                ))}
              </div>

              <button className="w-full py-3 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                Write a Review
              </button>
            </div>

            <div className="lg:col-span-8 space-y-8">
              <div className="flex gap-4 border-b border-slate-200 dark:border-slate-800 pb-1 overflow-x-auto hide-scrollbar">
                <button className="pb-3 border-b-2 border-primary text-primary font-semibold whitespace-nowrap">All Reviews</button>
                <button className="pb-3 border-b-2 border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-medium whitespace-nowrap transition-colors">With Images</button>
                <button className="pb-3 border-b-2 border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-medium whitespace-nowrap transition-colors">5 Stars</button>
              </div>

              {[1, 2].map((review) => (
                <div key={review} className="border-b border-slate-100 dark:border-slate-800 pb-8">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <img
                        alt="User Avatar"
                        className="w-10 h-10 rounded-full object-cover"
                        src={
                          review === 1
                            ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuBf9I8_tyUbviAorXatCl07Xeu5LpOAgYthbm8y73PlWJsnHjEu-f-Zwu8pfTokHUCgyITKbgFZqEXAlB7r-I0Pl5_iwItg7DeZgtsYH0210miuqTqC2UkwgLOOI2KfpKGukSAkJ35ydSpnDmxOMNOVvCBoahWePsBJL47Wej8kycewXxUohO5tu8lGAVZmESvp6WGYe6-yl4CFFaHCmTj9HOyi6HkANYpNGOl5Z1xA-rdnHiSIOZdnfhcZPJHyPOV6k5A3KZ08mVc'
                            : 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgWt6YId3ySAvK6GqDx8pH4_qGOyBY33IdgKu8J7qEMXVMZRHzE0GBRZqw_7_WdD7VWiCApZaET6dVrL8k__YJ5uMGBaYI1oOg0y9Z9pqiLbuqVOfA9Un3yaVn-mPNRZHPxlWZrfoqS8mFQDRfFqB7TfdneboNRpAaT_5Ygve-_iHW5H7FqT-5_kuqe1FN6qaerkJTY0njyr-LiYeuiuT2AyhzFdM3QGJ0oqjX2ymAA6u88dbgBvp_lKpsD2qvOZiMXyDMiv6EKYY'
                        }
                      />
                      <div>
                        <h5 className="font-bold text-slate-900 dark:text-white">{review === 1 ? 'Sarah Johnson' : 'Michael Chen'}</h5>
                        <div className="flex items-center gap-2">
                          <div className="flex text-yellow-400 text-xs">
                            <span className="material-symbols-outlined fill-current text-[14px]">star</span>
                            <span className="material-symbols-outlined fill-current text-[14px]">star</span>
                            <span className="material-symbols-outlined fill-current text-[14px]">star</span>
                            <span className="material-symbols-outlined fill-current text-[14px]">star</span>
                            <span className="material-symbols-outlined fill-current text-[14px]">
                              {review === 1 ? 'star' : 'star_half'}
                            </span>
                          </div>
                          <span className="text-xs text-slate-400">{review === 1 ? '2 days ago' : '1 week ago'}</span>
                        </div>
                      </div>
                    </div>
                    <span className="hidden sm:inline-flex items-center gap-1 text-green-600 text-xs font-semibold bg-green-50 px-2 py-1 rounded-full">
                      <span className="material-symbols-outlined text-[14px]">check_circle</span> Verified Buyer
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">
                    {review === 1 ? 'Absolutely love these shoes!' : 'Great style, good comfort'}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {review === 1
                      ? "I've been wearing these for my morning runs for about a week now and they are incredibly comfortable. The cushioning is perfect, not too soft but absorbs impact well. Sizing was true to fit."
                      : 'The design is exactly what I was looking for. Very modern and clean. Comfortable enough for daily walking.'}
                  </p>
                  {review === 2 && (
                    <div className="flex gap-2 mb-4">
                      <div className="w-20 h-20 rounded-lg overflow-hidden cursor-pointer">
                        <img
                          className="w-full h-full object-cover hover:scale-110 transition-transform"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdNF8EDkMr9hFqIwiJyWFy2Ay7UvEHfqVFTVNONlVd-J3kd04zStwMf5Zl-bA6ObkeQzJSIth1w3wZzRfux4D-jx5Ttrfg4TVfGTV8cwMeJYBynmUfURHIoufyMxs7ev9038gTW227HaMSr6o_hQWutVQw3FvxbyteXrIYMHggx4Oq3NVeIu9pi24hCzyMreHTadApagbTrh_ZOp6I4KJJdZ_1D7lcjzrW5hspARbWmETo7gZte28O-qIOY7nn962icgG-5_BfaEg"
                          alt="Review attachment"
                        />
                      </div>
                    </div>
                  )}
                  <div className="flex gap-4">
                    <button className="flex items-center gap-1 text-slate-400 hover:text-primary text-sm transition-colors">
                      <span className="material-symbols-outlined text-[18px]">thumb_up</span> Helpful ({review === 1 ? '12' : '5'})
                    </button>
                    <button className="flex items-center gap-1 text-slate-400 hover:text-slate-600 text-sm transition-colors">
                      <span className="material-symbols-outlined text-[18px]">comment</span> Comment
                    </button>
                  </div>
                </div>
              ))}

              <button className="w-full py-3 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-400 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                Load More Reviews
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetailsPage;
