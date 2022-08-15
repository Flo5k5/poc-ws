import { Link, useNavigate } from "react-router-dom";
import useFetchProducts, { Product } from "src/api/useFetchProducts";

export default function Products() {
  const navigate = useNavigate();

  const { status, data: products } = useFetchProducts();

  function handleBidButton(product: Product) {
    return () => {
      navigate(`/products/bid/${product.name}/${product.price}`);
    };
  }

  return (
    <div>
      <div className="table__container">
        <Link to="/products/add" className="products__cta">
          ADD PRODUCTS
        </Link>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Last Bidder</th>
              <th>Creator</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {status === "loading" && (
              <tr>
                <td>Loading</td>
              </tr>
            )}
            {status === "success" &&
              products.map((product) => (
                <tr key={`${product.name}${product.price}`}>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.last_bidder || "None"}</td>
                  <td>{product.owner}</td>
                  <td>
                    <button onClick={handleBidButton(product)}>Edit</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
