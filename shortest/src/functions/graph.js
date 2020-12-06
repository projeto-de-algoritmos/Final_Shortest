export default class Graph {
  constructor() {
    this.vertexs = {}; // implementado assim para poder achar qualquer nó em O(1) (passando o id)
    this.memoization = {};
    this.totalNodes = 0;
    this.sucessor = {};
    this.solutionSet = {};
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
  addEdge(origin, destiny, weight, type) {
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

  getVertex() {
    return this.vertexs;
  }

  getTotalVertex() {
    return this.totalNodes;
  }

  clear() {
    this.vertexs = {};
    this.memoization = {};
    this.totalNodes = 0;
    this.sucessor = {};
    this.solutionSet = {};
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

    // ----------------------------------------------------------- //
    for (let i = 1; i <= this.totalNodes - 1; ++i) {
      for (let vertex in this.vertexs) {
        this.memoization[i][vertex] = this.memoization[i - 1][vertex]; // o valor atual recebe o mesmo valor da coluna acima
        // para cada vizinho do nó
        for (let edge in this.vertexs[vertex].neighbors) {
          // o if abaixo verifica se os 2 valores sao infinitos, se sim, vai pra proxima iteração.
          if (
            this.memoization[i][vertex] === Number.MAX_SAFE_INTEGER &&
            this.memoization[i - 1][edge] === Number.MAX_SAFE_INTEGER
          ) {
            continue;
          }
          // o if abaixo verifica se o valor atual e maior que o valor do vizinho na linha de cima + o peso desse vizinho
          if (
            this.memoization[i][vertex] >
            this.memoization[i - 1][edge] +
              this.vertexs[vertex].neighbors[edge].weight
          ) {
            //se sim faz o swap, e adiciona o sucessor.
            this.memoization[i][vertex] =
              this.memoization[i - 1][edge] +
              this.vertexs[vertex].neighbors[edge].weight;
            this.sucessor[vertex] = edge;
          }
        }
      }
    }
    // ----------------------------------------------------------- //
  }
  // find solution
  findSolution(origin, destiny) {
    for (let vertex in this.vertexs) {
      let aux = this.memoization[this.totalNodes - 1][vertex]; // salvando o valor do vertex atual na ultima iteração e salvando em aux
      if (aux == Number.MAX_SAFE_INTEGER) {
        // se o ultimo valor do vertex atual na ultima iteração for infinito, significa que nao existe aresta para o nó destino
        //partin do de vertex, entao é adicionado null.
        this.solutionSet[vertex] = null;
        continue;
      }
      for (let i = this.totalNodes - 2; i >= 0; --i) {
        // verificando até qual indice o valor permanece o mesmo para sabermos o menor numero de arestas
        if (this.memoization[i][vertex] == aux) {
          this.solutionSet[vertex] = i;
        }
      }
    }

    // find path
    let aux = origin;
    if (aux == destiny) {
      console.log("Destino e origem iguais");
      return -2;
    }
    if (!this.sucessor.hasOwnProperty(origin)) {
      console.log("Não existe um caminho entre ", origin, " e ", destiny);
      return -1;
    }
    let path = [];
    while (aux != destiny) {
      // procurando o caminho do nó origem até o destino;
      path.push(aux);

      let last = this.sucessor[aux];

      aux = last;
    }
    path.push(aux);
    let response = {
      path: path,
      cost: this.memoization[this.solutionSet[origin]][origin],
    };

    console.log("memoization", this.memoization);
    console.log("solutionset", this.solutionSet);
    return response;
  }
}
