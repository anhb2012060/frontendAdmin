import { BrowserRouter } from 'react-router-dom';
import './App.css';
import DashBoardPage from './pages/DashBoardPage';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <DashBoardPage></DashBoardPage>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
