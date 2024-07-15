import React from 'react';
import CommentsScreen from './src/Modules/CommentsScreen';
import {ScreenContextProvider} from './src/Contexts/ScreenContext';
import { Provider } from 'react-redux';
import Store from './src/Redux/Store/Store';

const App:React.FC = () => {
  return (
    <Provider store={Store}>
      <ScreenContextProvider>
        <CommentsScreen />
      </ScreenContextProvider>
    </Provider>
  );
};

export default App;
