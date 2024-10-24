import { Provider } from "react-redux";
import { AppRouter } from "./routers/AppRouter"
import './styles/index.scss';
import { store } from "./store/store";

export const App = () => {
  return <div className="light-theme" id="main">
    <Provider store={store}>
      <AppRouter/>
    </Provider>
  </div>
}