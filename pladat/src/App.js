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
import PrivateRoute from "./components/PrivateRoute";
import ResetPassword from "./components/ResetPassword";
import SignUpPage from "./Pages/SignUpPage";
import SignInPage from "./Pages/SignInPage";
import PrepareCV from "./Pages/PrepareCV";
import CVPage from "./Pages/CV";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={HomeMain} />
          <Route exact path="/Home" component={HomeMain} />
          <Route exact path="/Home/SignUp" component={SignUpPage} />
          <Route exact path="/Home/SignIn" component={SignInPage} />
          <PrivateRoute exact path="/HomeStudent" component={HomeStudent} />
          <PrivateRoute
            exact
            path="/HomeStudent/CV/PrepareCV"
            component={PrepareCV}
          />
          <PrivateRoute exact path="/HomeStudent/CV" component={CVPage} />
          <PrivateRoute exact path="/HomeCompany" component={HomeCompany} />
          <Route exact path="/ResetPassword" component={ResetPassword} />
          <Route exact path="/404NotFound" component={NotFound} />
          <Redirect to="/404NotFound" />
          {/* Bunun hiçbir koşulu olmadığı için ne olursa olsun çalışacak o yüzden en altta kalmalı*/}
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
