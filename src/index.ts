interface Usuario {
  id: number;
  name: string;
  bio: string;
  login: string;
  public_repos: number;
  repos_url: string;
}

interface Repository {
  name: string;
  description: string;
  fork: boolean;
  stargazer_count: number;
}

let users: Usuario[] = [];

async function getPublicRepositories(name: string) {
  try {
    const response = await fetch(`https://api.github.com/users/${name}`);
    const user = await response.json();

    if (user.message && user.message === "Not Found") {
      console.log("Usuário não encontrado");
      return null;
    }

    let newUser: Usuario = {
      id: user.id,
      name: user.name,
      bio: user.bio,
      login: user.login,
      public_repos: user.public_repos,
      repos_url: user.repos_url,
    };

    console.log(
      `Usuário ${newUser.name} apelido ${newUser.login} biografia ${newUser.bio} login ${newUser.login} repositorios publicos ${newUser.public_repos} quantidade de repositorios ${newUser.repos_url}`
    );

    users.push(newUser);

    return newUser;
  } catch (err) {
    console.log("Erro ao obter os dados do usuário", err);
    return null;
  }
}

async function log() {
  const result = await getPublicRepositories("Kimichubi");
  const result2 = await getPublicRepositories("Isaac");
  const result3 = await getPublicRepositories("Robert");
  const result4 = await getPublicRepositories("Kyle");
  const result5 = await getPublicRepositories("Leonardo");
  const result6 = await getPublicRepositories("Gabriel");
  const result7 = await getPublicRepositories("Higor");
  const result8 = await getPublicRepositories("Emanuela");
  console.log(
    result,
    result2,
    result3,
    result4,
    result5,
    result6,
    result7,
    result8
  );
}

log();

async function userDetails(name: string) {
  const userDetails = users.find((user) => user.name === name);
  if (!userDetails) {
    console.log(`Usuário ${name} não encontrado`);
    return null;
  }

  const userRepo = await fetch(userDetails.repos_url)
    .then((resp) => resp.json())
    .catch((err) => console.log(err));

  let newRepositorie: Repository = {
    name: userRepo.name,
    description: userRepo.description,
    fork: userRepo.fork,
    stargazer_count: userRepo.stargazer_count,
  };

  return newRepositorie;
}

async function listUsers() {
  return users;
}

function calculateRepositories() {
  const repositorios = users.reduce(
    (accum, user) => accum + user.public_repos,
    0
  );
  console.log(repositorios);
}

setTimeout(calculateRepositories, 1000);

async function maiorRepositorio() {
  const repositorios = users.reduce((maiorRepositorio, user) =>
    user.public_repos > maiorRepositorio.public_repos ? user : maiorRepositorio
  );

  const repositoriosOrganizados = users
    .slice()
    .sort((a, b) => b.public_repos - a.public_repos);

  const cincoMaiores = repositoriosOrganizados.slice(0, 5);

  console.log(cincoMaiores);
  console.log(
    `O maior Repositorio é de ${repositorios.name} ele possui ${
      repositorios.public_repos
    } repositorios UAU =) 
    Os 5 maiores são 1°${JSON.stringify(cincoMaiores[0])}
    2°${JSON.stringify(cincoMaiores[1])}
    3°${JSON.stringify(cincoMaiores[2])}
    4°${JSON.stringify(cincoMaiores[3])}
    5°${JSON.stringify(cincoMaiores[4])}
    `
  );
}

setTimeout(maiorRepositorio, 1000);
