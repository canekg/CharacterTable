const apiPath = 'https://swapi.dev/api/';

interface IRoutes {
  main: () => string;
  dataPath: () => string;
  addCharacter: () => string;
}

const routes: IRoutes = {
  main: () => '/*',
  addCharacter: () => 'add',
  dataPath: () => [apiPath, 'people'].join('/'),
};

export default routes;
