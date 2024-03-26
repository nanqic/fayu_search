import './assets/app.css'
import { Route, Switch } from "wouter";
import { Search } from './pages/Search';
import Footer from './components/Footer';

export function App() {
  const BASE_PATH = import.meta.env.VITE_BASE_PATH
  return (
    <div className="max-w-screen-md md:mx-auto flex flex-col">
      <Switch>
        <Route path={`${BASE_PATH}/search/:keyword/:page?`} component={Search} />
        {/* <Route path={`${BASE_PATH}`} component={Search} /> */}
        <Route path={`*`} component={Search} />
      </Switch>
      <Footer />
    </div>
  )
}
