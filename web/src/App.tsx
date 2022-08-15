import { connect } from "socket.io-client";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Suspender from "src/components/Suspender";
import Layout from "src/components/Layout";
import NoMatch from "src/components/NoMatch";
import Home from "src/pages/Home";
import lazyPageImport from "src/utils/lazyPageImport";
import { SOCKET_URL } from "src/constants";

const AddProduct = lazyPageImport("AddProduct");
const BidProduct = lazyPageImport("BidProduct");
const Products = lazyPageImport("Products");

const socket = connect(SOCKET_URL)

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout socket={socket} />}>
          <Route index element={<Home />} />
          <Route
            path="/products"
            element={
              <Suspender>
                <Products />
              </Suspender>
            }
          />
          <Route
            path="/products/add"
            element={
              <Suspender>
                <AddProduct socket={socket} />
              </Suspender>
            }
          />
          <Route
            path="/products/bid/:name/:price"
            element={
              <Suspender>
                <BidProduct socket={socket} />
              </Suspender>
            }
          />
          <Route
            path="*"
            element={
              <Suspender>
                <NoMatch />
              </Suspender>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
