import "./App.css";
import HomeMain from "./Pages/HomeMain";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import NotFound from "./Pages/404Page";
import HomeStudent from "./Pages/HomeStudent";
import HomeCompany from "./Pages/HomeCompany";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={HomeMain} />
          <Route exact path="/Home" component={HomeMain} />
          <Route exact path="/HomeStudent" component={HomeStudent} />
          <Route exact path="/HomeCompany" component={HomeCompany} />
          <Route exact path="/404NotFound" component={NotFound} />
          <Redirect to="/404NotFound" />
          {/* Bunun hiçbir koşulu olmadığı için ne olursa olsun çalışacak o yüzden en altta kalmalı*/}
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
