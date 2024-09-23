import { tempo } from '@staleread/tempo';
import { HomePage } from './pages/HomePage';

function App() {
  const imports = [HomePage];
  const template = `<HomePage/>`;

  return { imports, template };
}

const root = document.getElementById('root');
tempo.render(root!, App);
