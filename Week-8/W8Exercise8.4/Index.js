const isValidPath = (n, edges, source, destination) => {
  const graph = new Array(n).fill(0).map(() => new Array(n).fill(0));
  for (const [u, v] of edges) {
    graph[u][v] = 1;
    graph[v][u] = 1;
  }
  const queue = [source];
  const visited = [source];
  while (queue.length) {
    const node = queue.shift() ?? queue[0];
    for (let i = 0; i < n; i++) {
      if (graph[node][i] && !visited.includes(i)) {
        queue.push(i);
        visited.push(i);
      }
    }
  }
  return visited.includes(destination);
};

const exps = [
  {
    n: 3,
    edges: [
      [0, 1],
      [1, 2],
      [2, 0],
    ],
    source: 0,
    destination: 2,
  },
  {
    n: 6,
    edges: [
      [0, 1],
      [0, 2],
      [3, 5],
      [5, 4],
      [4, 3],
    ],
    source: 0,
    destination: 5,
  },
];

for (const i of exps)
  console.log(
    "is valid path:",
    isValidPath(i.n, i.edges, i.source, i.destination)
  );
