import { tempo } from '@staleread/tempo';
import { Chef, ChefAddDto } from '../api/api.types';
import { addChef, getAllChefs, getChef } from '../api/chef-api';
import { AddChefForm } from './AddChefForm';
import { ChefList } from './ChefList';

export function ChefPane() {
  const [chefId, setChefId] = tempo.useState(0);
  const [chefs, setChefs] = tempo.useState<Chef[]>([]);

  tempo.useEffect(() => setChefs([...getAllChefs()]), []);

  const imports = [AddChefForm, ChefList];

  const template = `
  <div class="container mt-5">
    <AddChefForm
      :bind={chefId}
      .onValidSubmit={handleChefAdded}
    />
    <ChefList .chefs={chefs}/>
  </div>`;

  const attach = {
    chefId,
    chefs,
    handleChefAdded: (dto: ChefAddDto) => {
      const id = addChef(dto);
      const newChef = getChef(id);

      setChefs([...chefs, newChef]);
      setChefId(id);
    },
  };

  return { imports, template, attach };
}
