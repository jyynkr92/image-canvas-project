import MainLayout from 'components/common/MainLayout';
import Gallery from 'pages/Gallery';
import Main from 'pages/Main';
import { Switch } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Switch>
      <MainLayout exact path='/' component={Main} />
      <MainLayout exact path='/gallery/:imageId' component={Gallery} />
    </Switch>
  );
}

export default App;
