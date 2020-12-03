class Graph {
  constructor() {
    this.vertexs = {}; // implementado assim para poder achar qualquer nó em O(1) (passando o id)
    this.memoization = {};
    this.totalNodes = 0;
  }

  // adição de um vertice 'id' no grafo
  addVertex(id) {
    let vertex = {
      id: id,
      neighbors: {}, // implementado assim para poder achar qualquer nó vizinho em O(1) (passando o id)
      degree: 0,
    };

    this.vertexs[id] = vertex;
    this.totalNodes++;
  }

  // OBS: parametro 'type' opcional (se nao for passado ele considera uma aresta orientada (a->c))
  // se for passado o valor 'undirected' em 'type', ele alem de fazer a aresta (a->c) ele faz a aresta (c->a)
  addEdge(origin, destiny, type, weight) {
    let new_edge = {
      origin: origin,
      destiny: destiny,
      weight: weight,
    };
    this.vertexs[origin]["neighbors"][destiny] = new_edge;
    this.vertexs[origin]["degree"]++;

    if (type === "undirected") {
      let new_inverse_edge = {
        origin: destiny,
        destiny: origin,
        weight: weight,
      };

      this.vertexs[destiny]["neighbors"][origin] = new_inverse_edge;
      this.vertexs[destiny]["degree"]++;
    }
  }

  shortestPath(destiny) {
    // iniciar com infinito e zerar somente a coluna do nó destiny

    for (let i = 0; i < this.totalNodes; ++i) {
      this.memoization[i] = {}; // criando objeto para cada iteração
      for (let vertex in this.vertexs) {
        this.memoization[i][vertex] = Number.MAX_SAFE_INTEGER; // recebendo valor "infinito"
      }
      this.memoization[i][destiny] = 0; // zerando a coluna do nó procurado, pois para chegar a ele precisamos de 0 arestas.
    }

    // loops para verificar os menores caminhos (logica do algoritmo)
    // find solution
  }
}
