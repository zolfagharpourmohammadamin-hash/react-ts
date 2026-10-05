import { useEffect, useState } from "react";

import { useNavigate } from "react-router";

import toast from "react-hot-toast";

import Typography from "../../components/global/Typography";

import Loding from "../../components/global/Loding";

import DsErorr from "../../components/disignSystem/DsErorr";

import DsButton from "../../components/disignSystem/DsButton";

import { DUMMY_URL_FETCH } from "../../constans/URLfetch";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  thumbnail: string;
  images: string[];
};

type CartItem = Product & {
  quantity: number;
};

function Home() {
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [slide, setSlide] = useState(0);
  const [refresh, setRefresh] = useState(0);

  const getProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${DUMMY_URL_FETCH}/products`);

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();

      setProducts(data.products);
    } catch (error) {
      console.log(error);
      setError("Products could not be loaded.");
      toast.error("Could not load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, [refresh]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlide((prev) => (prev + 1) % 3);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
      }

      return [
        ...prev,
        {
          ...product,
          quantity: 1,
        },
      ];
    });

    toast.success("Product added to cart.");
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === id);

      if (!existing) {
        return prev;
      }

      if (existing.quantity === 1) {
        return prev.filter((item) => item.id !== id);
      }

      return prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item,
      );
    });
  };

  const getQuantity = (id: number) => {
    return cart.find((item) => item.id === id)?.quantity || 0;
  };

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const placeOrder = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    toast.success("Order placed successfully.");
    setCart([]);
  };

  if (loading) {
    return <Loding />;
  }


  return (
    <>
      <div className="mt-3 flex items-center justify-between">
        <Typography text="Store" />

        <DsButton
          click={() => setRefresh((prev) => prev + 1)}
          clasName="mr-[100px]"
          text="Refresh"
          color="cyan"
          radios="lg"
        />
      </div>
      {error ? (
        <DsErorr Erorr="Error" TextEror={error} />
      ) : (
        <div className="min-h-screen p-6">
          <div className="relative mb-10 h-[450px] overflow-hidden rounded-3xl border border-gray-800 bg-gray-950 drop-shadow-[0_0_20px_rgba(34,211,238,0.7)]">
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-700"
              style={{
                backgroundImage: `url(${
                  [
                    "https://images.unsplash.com/photo-1667597366972-929880a50626?auto=format&fit=crop&w=1600&q=80",
                    "https://images.unsplash.com/photo-1564286026068-768c72de7855?auto=format&fit=crop&w=1600&q=80",
                    "https://images.unsplash.com/photo-1655931546470-cb804be56d88?auto=format&fit=crop&w=1600&q=80",
                  ][slide]
                })`,
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/80 to-transparent" />

            <button
              onClick={() => setSlide((prev) => (prev - 1 + 3) % 3)}
              className="absolute left-5 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-gray-900/80 text-2xl text-white transition hover:bg-cyan-600"
            >
              ‹
            </button>

            <button
              onClick={() => setSlide((prev) => (prev + 1) % 3)}
              className="absolute right-5 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-gray-900/80 text-2xl text-white transition hover:bg-cyan-600"
            >
              ›
            </button>

            <div className="relative z-10 flex h-full max-w-xl flex-col justify-center px-10">
              <span className="mb-4 w-fit rounded-full bg-cyan-500 px-4 py-2 text-sm font-bold text-gray-950">
                Special Offer
              </span>

              <h1 className="text-4xl font-bold leading-tight text-white">
                Premium Technology
                <span className="block text-cyan-400">
                  For Your Everyday Life
                </span>
              </h1>

              <p className="mt-4 max-w-md text-gray-300">
                Discover the latest electronics, smart devices and premium
                accessories at great prices.
              </p>

              <div className="mt-6">
                <DsButton
                  text="Shop Now"
                  color="cyan"
                  size="lg"
                  radios="xl"
                  click={() => {
                    document
                      .getElementById("products")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                />
              </div>
            </div>

            <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2">
              {[0, 1, 2].map((item) => (
                <button
                  key={item}
                  onClick={() => setSlide(item)}
                  className={`h-2.5 rounded-full transition-all ${
                    slide === item ? "w-8 bg-cyan-400" : "w-2.5 bg-gray-500"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="mb-8 flex items-center justify-between">
            <Typography text="Product Store" />

            <div className="rounded-xl bg-gray-800 px-5 py-3 text-white">
              Cart: {totalItems}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => {
              const quantity = getQuantity(product.id);

              return (
                <div
                  key={product.id}
                  className="flex flex-col overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 drop-shadow-[0_0_8px_rgba(34,211,238,0.7)]"
                >
                  <div className="flex h-64 items-center justify-center bg-white p-5">
                    <img
                      src={product.images?.[0] || product.thumbnail}
                      alt={product.title}
                      className="h-full w-full object-contain"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = product.thumbnail;
                      }}
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="mb-2 line-clamp-2 text-lg font-bold text-white">
                      {product.title}
                    </h2>

                    <p className="mb-3 text-sm text-cyan-400">
                      {product.category}
                    </p>

                    <p className="mb-4 line-clamp-3 text-sm leading-6 text-gray-400">
                      {product.description}
                    </p>

                    <div className="mb-5 text-2xl font-bold text-green-400">
                      ${product.price}
                    </div>

                    <div className="mt-auto flex gap-2">
                      {quantity === 0 ? (
                        <DsButton
                          text="Add to Cart"
                          color="cyan"
                          size="lg"
                          radios="xl"
                          click={() => addToCart(product)}
                          clasName="flex-1"
                        />
                      ) : (
                        <div className="flex flex-1 items-center justify-between rounded-xl bg-gray-800 p-1">
                          <DsButton
                            text="+"
                            color="green"
                            size="sm"
                            radios="xl"
                            click={() => addToCart(product)}
                          />

                          <span className="px-3 text-lg font-bold text-white">
                            {quantity}
                          </span>

                          <DsButton
                            text="-"
                            color="red"
                            size="sm"
                            radios="xl"
                            click={() => removeFromCart(product.id)}
                          />
                        </div>
                      )}

                      <DsButton
                        text="Details"
                        color="gray"
                        size="lg"
                        radios="xl"
                        click={() => navigate(`/app/products/${product.id}`)}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <div className="mb-5 flex items-center justify-between">
              <Typography text="Shopping Cart" />

              <span className="text-gray-400">{totalItems} items</span>
            </div>

            {cart.length === 0 ? (
              <p className="text-gray-400">Your cart is empty.</p>
            ) : (
              <>
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between rounded-xl bg-gray-800 p-4"
                    >
                      <div>
                        <p className="font-bold text-white">{item.title}</p>

                        <p className="mt-1 text-sm text-gray-400">
                          ${item.price} × {item.quantity}
                        </p>
                      </div>

                      <p className="font-bold text-green-400">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-gray-700 pt-5">
                  <div>
                    <p className="text-gray-400">Total</p>

                    <p className="text-2xl font-bold text-green-400">
                      ${totalPrice.toFixed(2)}
                    </p>
                  </div>

                  <DsButton
                    text="Place Order"
                    color="green"
                    size="lg"
                    radios="xl"
                    click={placeOrder}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
