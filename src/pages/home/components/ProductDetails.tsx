import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Typography from "../../../components/global/Typography";
import Loding from "../../../components/global/Loding";
import DsErorr from "../../../components/disignSystem/DsErorr";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  thumbnail: string;
  images: string[];
};

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getProduct = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `https://dummyjson.com/products/${id}`
      );

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();

      setProduct(data);
    } catch (error) {
      console.log(error);
      setError("Product could not be loaded.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  if (loading) {
    return <Loding />;
  }

  if (error || !product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-5">
        <DsErorr
          Erorr="Error"
          TextEror={error || "Product not found."}
        />

        <button
          onClick={getProduct}
          className="rounded-lg bg-cyan-600 px-6 py-3 text-white hover:bg-cyan-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl p-6 text-white">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 rounded-lg bg-gray-800 px-5 py-2 hover:bg-gray-700"
      >
        ← Back
      </button>

      <div className="grid grid-cols-1 gap-8 rounded-2xl border border-gray-800 bg-gray-900 p-6 md:grid-cols-2">
        <div className="flex min-h-[450px] items-center justify-center rounded-xl bg-white p-8">
          <img
            src={product.images?.[0] || product.thumbnail}
            alt={product.title}
            className="max-h-[400px] max-w-full object-contain"
            onError={(e) => {
              e.currentTarget.src = product.thumbnail;
            }}
          />
        </div>

        <div className="flex flex-col justify-center">
          <Typography text={product.title} />

          <p className="mt-4 text-cyan-400">
            {product.category}
          </p>

          <p className="mt-6 leading-7 text-gray-400">
            {product.description}
          </p>

          <p className="mt-6 text-3xl font-bold text-green-400">
            ${product.price}
          </p>

          <button
            onClick={() => navigate(-1)}
            className="mt-8 w-full rounded-xl bg-cyan-600 py-3 font-bold hover:bg-cyan-700"
          >
            Back to Products
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;