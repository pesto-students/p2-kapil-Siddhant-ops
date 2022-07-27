const findPaths = (graph) => {
  const paths = [];
  const visited = new Array(graph.length).fill(false);
  const path = [];
  const dfs = (node) => {
    visited[node] = true;
    path.push(node);
    for (let i = 0; i < graph[node].length; i++) {
      const nextNode = graph[node][i];
      if (visited[nextNode]) continue;
      dfs(nextNode);
    }
    if (node === graph.length - 1) {
      paths.push(path.slice());
    }
    path.pop();
    visited[node] = false;
  };
  dfs(0);
  return paths;
};

const exps = [
  {
    graph: [[1, 2], [3], [3], []],
    result: [
      [0, 1, 3],
      [0, 2, 3],
    ],
  },
  {
    graph: [[4, 3, 1], [3, 2, 4], [3], [4], []],
    result: [
      [0, 4],
      [0, 3, 4],
      [0, 1, 3, 4],
      [0, 1, 2, 3, 4],
      [0, 1, 4],
    ],
  },
];

for (const i of exps) {
  console.log(
    "find paths:",
    findPaths(i.graph),
    findPaths(i.graph).toString() === i.result.toString()
  );
}
