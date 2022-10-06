import { PlusSmallIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import useFetchProducts, { Product } from "src/api/useFetchProducts";
import SpinnerIcon from "src/ui/icons/SpinnerIcon";
import useHeaderTitle from "src/hooks/useHeaderTitle";

export default function Products() {
  useHeaderTitle("Products");
  const navigate = useNavigate();

  const { status, data: products } = useFetchProducts();

  function handleBidButton(product: Product) {
    return () => {
      navigate(`/products/bid/${product.name}/${product.price}`);
    };
  }

  return (
    <div className=" flex-1 flex flex-col mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 gap-10">
      <div className="self-end">
        <Link to="/products/add" className="flex w-40 h-4 items-center uppercase">
          <PlusSmallIcon className="w-7 h-7" /> Add products
        </Link>
      </div>

      <table className="border-collapse table-fixed w-full text-sm">
        <thead>
          <tr>
            {["Name", "Price", "Last Bidder", "Creator", "Edit"].map(
              (columnName, index) => (
                <th key={`${columnName}-${index}`} className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400  text-left">
                  {columnName}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {status === "loading" && (
            <tr>
              <td><SpinnerIcon className="animate-spin h-10 w-10 text-gray-900" /></td>
            </tr>
          )}
          {status === "success" &&
            products.map((product) => (
              <tr key={`${product.name}-${product.price}`}>
                <td className="border-b border-slate-200 dark:border-slate-600 p-4 pl-8 text-slate-500 dark:text-slate-400">
                  {product.name}
                </td>
                <td className="border-b border-slate-200 dark:border-slate-600 p-4 pl-8 text-slate-500 dark:text-slate-400">
                  {product.price}
                </td>
                <td className="border-b border-slate-200 dark:border-slate-600 p-4 pl-8 text-slate-500 dark:text-slate-400">
                  {product.last_bidder || "None"}
                </td>
                <td className="border-b border-slate-200 dark:border-slate-600 p-4 pl-8 text-slate-500 dark:text-slate-400">
                  {product.owner}
                </td>
                <td className="border-b border-slate-200 dark:border-slate-600 p-4 pl-8 text-slate-500 dark:text-slate-400">
                  <button onClick={handleBidButton(product)}>Edit</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
