import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer.components";
import Header from "./components/Header/Header.component";
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import WorkEditPage from "./pages/Work/WorkEditPage";
import WorkListPage from "./pages/Work/WorkListPage";

function App() {
  return (
    <Router>
      <Header />
      <main className="site-main">
        <Route path="/" component={HomePage} exact />
        <Route path="/login" component={LoginPage} />
        <Route path="/admin/work" exact component={WorkListPage} />
        <Route path="/admin/work/:id/edit" component={WorkEditPage} />
      </main>
      <Footer />
    </Router>
  );
}

export default App;
