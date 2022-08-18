// initial data
const ROADS = [
  "Alice's House-Bob's House",
  "Alice's House-Cabin",
  "Alice's House-Post Office",
  "Bob's House-Town Hall",
  "Daria's House-Ernie's House",
  "Daria's House-Town Hall",
  "Ernie's House-Grete's House",
  "Grete's House-Farm",
  "Grete's House-Shop",
  "Marketplace-Farm",
  "Marketplace-Post Office",
  "Marketplace-Shop",
  "Marketplace-Town Hall",
  "Shop-Town Hall"
];

function buildGraph(edges) {
  let graph = Object.create(null);
  function addEdge(from, to) {
    if (graph[from] == null) {
      graph[from] = [to];
    }
    graph[from].push(to);
  }
  for (let [from, to] of edges.map(r => r.split("-"))) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}

const roadGraph = buildGraph(ROADS);

function randomPick(array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

// engine
class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }

  static random(parcelCount = 5) {
    let parcels = [];
    for (let i = 0; i < parcelCount; i++) {
      let address = randomPick(Object.keys(roadGraph));
      let place;
      do {
        place = randomPick(Object.keys(roadGraph));
      } while (place == address);
      parcels.push({place, address});
    }
    const randState = new VillageState("Post Office", parcels);
    return randState;
  }

  move(destination) {
    if (!roadGraph[this.place].includes(destination)) {
      return this;
    } else {
      let parcels = this.parcels.map(p => {
        if (p.place != this.place) return p;
        return {place: destination, address: p.address};
      }).filter(p => p.place != p.address);
      return new VillageState(destination, parcels);
    }
  }
}

function runRobot(state, robot, memory) {
  console.log("~~~~~~~~~~Initial positions:~~~~~~~~~~");
  console.log(state);
  console.log("~~~~~~~~~~~Robot Movements:~~~~~~~~~~~");
  for (let turn = 0;; turn++) {
    if (state.parcels.length == 0) {
      console.log(`Done in ${turn} turns`);
      break;
    }
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    console.log(`Moved to ${action.direction}`);
  }
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
}

// random robot
function randomRobot(state) {
  return {direction: randomPick(roadGraph[state.place])};
}

console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
console.log("~~~~~~~~~~~~~~randomRobot~~~~~~~~~~~~~~");
runRobot(VillageState.random(), randomRobot);
console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

// route robot
const mailRoute = [
  "Alice's House", "Cabin", "Alice's House", "Bob's House",
  "Town Hall", "Daria's House", "Ernie's House",
  "Grete's House", "Shop", "Grete's House", "Farm",
  "Marketplace", "Post Office"
];

function routeRobot(state, memory) {
  if (memory.length == 0) {
    memory = mailRoute;
  }
  return {direction: memory[0], memory: memory.slice(1)};
}

console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
console.log("~~~~~~~~~~~~~~routeRobot~~~~~~~~~~~~~~");
runRobot(VillageState.random(), routeRobot, mailRoute);
console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

// goal oriented robot
function findRoute(graph, from, to) {
  let work = [{at: from, route: []}];
  for (let i = 0; i < work.length; i++) {
    let {at, route} = work[i];
    for (let place of graph[at]) {
      if (place == to) return route.concat(place);
      if (!work.some(w => w.at == place)) {
        work.push({at: place, route: route.concat(place)});
      }
    }
  }
}

function goalOrientedRobot({place, parcels}, route) {
  if (route.length == 0) {
    let parcel = parcels[0];
    if (parcel.place != place) {
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  return {direction: route[0], memory: route.slice(1)};
}

console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
console.log("~~~~~~~~~~~goalOrientedRobot~~~~~~~~~~~");
runRobot(VillageState.random(), goalOrientedRobot, []);
console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

// compare
function countRobotTurns(state, robot, memory) {
  let turns = 0;
  while (state.parcels.length > 0) {
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    turns++;
  }
  return turns;
}

function compareRobots(robot1, robot2, attempts = 100) {
  let robot1TotalTurns = 0;
  let robot2TotalTurns = 0;
  for (let i = 0; i < attempts; i++) {
    const testVillage = VillageState.random();
    robot1TotalTurns += countRobotTurns(testVillage, robot1.name, robot1.memory);
    robot2TotalTurns += countRobotTurns(testVillage, robot2.name, robot2.memory);
  }
  return {
    robot1: (robot1TotalTurns / attempts),
    robot2: (robot2TotalTurns / attempts),
  }
}

console.log("~~~~~~goalOriented VS routeRobot:~~~~~~");
console.log(compareRobots(
  {name: goalOrientedRobot, memory: []},
  {name: routeRobot, memory: mailRoute}
));

// effective robot
function findBestPath(roadsGraph, village) {
  const {place, parcels} = village;
  let paths = [];
  for (let i = 0; i < parcels.length; i++) {
    let currentPath;
    let delivery = false;
    if (parcels[i].place != place) {
      currentPath = findRoute(roadsGraph, place, parcels[i].place);
    } else {
      currentPath = findRoute(roadsGraph, place, parcels[i].address);
      delivery = true;
    }
    paths.push({path: currentPath, delivery});
  }
  return paths.reduce(
    (a, b) => {
      if ((a.path.length > b.path.length) || (a.path.length === b.path.length && a.delivery)) { return b };
      return a;
    }
  ).path;
}

function effectiveRobot(state, route) {
  if (route.length == 0) {
    route = findBestPath(roadGraph, state);
  }
  return {direction: route[0], memory: route.slice(1)};
}

console.log("~~~~goalOriented VS effectiveRobot:~~~~");
console.log(compareRobots(
  {name: goalOrientedRobot, memory: []},
  {name: effectiveRobot, memory: []}
));
