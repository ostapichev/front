import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from "react-redux";
import ReactDOM from 'react-dom/client';
import { unstable_HistoryRouter as BrowserRouter } from "react-router-dom";

import App from './App';
import { history } from './services';
import { Loading } from "./components";
import { persist, setupStore as store } from "./redux";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <Provider store={store}>
        <PersistGate loading={ <Loading /> } persistor={persist}>
            { /*// @ts-expect-error */ }
            <BrowserRouter history={history}>
                <App />
            </BrowserRouter>
        </PersistGate>
    </Provider>
);
