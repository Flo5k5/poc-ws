import { connect } from "socket.io-client";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Suspender from "src/components/Suspender";
import Layout from "src/components/Layout";
import NoMatch from "src/components/NoMatch";
import Home from "src/pages/Home";

const socket = connect("http://localhost:4000");

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout socket={socket} />}>
          <Route index element={<Home />} />
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
