import './assets/app.css'
import { Route, Switch } from "wouter";
import { Search } from './pages/Search';
import Footer from './components/Footer';

export function App() {
  return (
    <div className="md:container md:mx-auto flex flex-col">
      <Switch>
        <Route path="/search/:keyword/:page?" component={Search} />
        <Route path="" component={Search} />
      </Switch>
      <Footer />
    </div>
  )
}
