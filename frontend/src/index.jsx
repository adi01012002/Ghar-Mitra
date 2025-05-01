
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import {thunk} from "redux-thunk"; 
import { BrowserRouter } from "react-router-dom"; 

import rootReducer from './redux';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);
createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <Provider store={store}>
        <BrowserRouter> 
          <App />
        </BrowserRouter>
    </Provider>
  // </StrictMode>
);
