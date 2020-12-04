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

  test() {
    this.addVertex("s");
    this.addVertex("2");
    this.addVertex("3");
    this.addVertex("4");
  }
  exampleOne() {
    this.vertexs = {};
    this.memoization = {};
    this.totalNodes = 0;
    this.sucessor = {};
    this.solutionSet = {};

    this.addVertex("s");
    this.addVertex("2");
    this.addVertex("3");
    this.addVertex("4");
    this.addVertex("5");
    this.addVertex("6");
    this.addVertex("7");
    this.addVertex("t");

    this.addEdge("s", "2", null, 9);
    this.addEdge("s", "6", null, 6);
    this.addEdge("s", "7", null, 15);
    this.addEdge("2", "3", null, 10);
    this.addEdge("3", "5", null, -16);
    this.addEdge("3", "t", null, 19);
    this.addEdge("4", "3", null, 6);
    this.addEdge("4", "t", null, 6);
    this.addEdge("5", "4", null, 11);
    this.addEdge("5", "t", null, 16);
    this.addEdge("6", "3", null, 18);
    this.addEdge("6", "5", null, 30);
    this.addEdge("6", "7", null, -8);
    this.addEdge("7", "5", null, 20);
    this.addEdge("7", "t", null, 44);

    let nodes = [];
    let edges = [];

    for (let vertex in this.vertexs) {
      let new_node = {
        id: vertex,
        label: vertex,
        title: "node 1",
      };
      nodes.push(new_node);

      for (let edge in this.vertexs[vertex].neighbors) {
        // console.log(this.vertexs[vertex].neighbors[edge].weight);
        // console.log("edge aqui -> ", edge);
        let new_edge = {
          from: this.vertexs[vertex].neighbors[edge].origin,
          to: this.vertexs[vertex].neighbors[edge].destiny,
          label: this.vertexs[vertex].neighbors[edge].weight.toString(),
          color: "#FF0",
        };
        edges.push(new_edge);
      }
    }

    let dict = {
      nodes: nodes,
      edges: edges,
    };
    // console.log(this.vertexs);

    return { dict: dict, vertexs: this.vertexs, total: this.totalNodes };
  }

  exampleTwo() {
    this.vertexs = {};
    this.memoization = {};
    this.totalNodes = 0;
    this.sucessor = {};
    this.solutionSet = {};
    this.addVertex("A");
    this.addVertex("B");
    this.addVertex("C");
    this.addVertex("D");
    this.addVertex("E");
    this.addEdge("A", "B", null, -1);
    this.addEdge("A", "C", null, 4);
    this.addEdge("B", "C", null, 3);
    this.addEdge("B", "D", null, 2);
    this.addEdge("B", "E", null, 2);
    this.addEdge("D", "B", null, 1);
    this.addEdge("D", "C", null, 5);
    this.addEdge("E", "D", null, -3);

    let nodes = [];
    let edges = [];

    for (let vertex in this.vertexs) {
      let new_node = {
        id: vertex,
        label: vertex,
        title: "node 1",
      };
      nodes.push(new_node);

      for (let edge in this.vertexs[vertex].neighbors) {
        // console.log(this.vertexs[vertex].neighbors[edge].weight);
        // console.log("edge aqui -> ", edge);
        let new_edge = {
          from: this.vertexs[vertex].neighbors[edge].origin,
          to: this.vertexs[vertex].neighbors[edge].destiny,
          label: this.vertexs[vertex].neighbors[edge].weight.toString(),
          color: "#FF0",
        };
        edges.push(new_edge);
      }
    }

    let dict = {
      nodes: nodes,
      edges: edges,
    };

    return { dict: dict, vertexs: this.vertexs, total: this.totalNodes };
  }

  shortestPath(origin, destiny) {
    console.log(this.vertexs);
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
        // console.log(
        //   "\n\n----------------------------------------------------------"
        // );
        // console.log("\n\no I eh -> ", i);
        // console.log("vertice atual eh -> ", vertex);
        this.memoization[i][vertex] = this.memoization[i - 1][vertex]; // o valor atual recebe o mesmo valor da coluna acima

        // console.log(
        //   "esse valor[",
        //   i,
        //   ",",
        //   vertex,
        //   "] ->",
        //   this.memoization[i][vertex]
        // );
        // console.log(
        //   "recebera este[",
        //   i - 1,
        //   ",",
        //   vertex,
        //   "]->",
        //   this.memoization[i - 1][vertex]
        // );
        // // console.log(this.memoization[i - 1]);
        // console.log(
        //   "vizinhos de ",
        //   vertex,
        //   "-> ",
        //   this.vertexs[vertex].neighbors
        // );
        // console.log(this.memoization);
        // para cada vizinho do nó
        for (let edge in this.vertexs[vertex].neighbors) {
          // console.log("aresta atual -> ", edge);
          // console.log(
          //   "esse valor[",
          //   i,
          //   ", ",
          //   vertex,
          //   "]-> ",
          //   this.memoization[i][vertex]
          // );
          // console.log(
          //   "eh maior q este?[",
          //   i - 1,
          //   ", ",
          //   edge,
          //   "]-> ",
          //   this.memoization[i - 1][edge]
          // );
          // console.log(
          //   "mais esse? -> ",
          //   this.vertexs[vertex].neighbors[edge].weight
          // );
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
            // console.log("se sim entao iremos fazer o swap");
            this.memoization[i][vertex] =
              this.memoization[i - 1][edge] +
              this.vertexs[vertex].neighbors[edge].weight;
            this.sucessor[vertex] = edge;
            // console.log("o sucessor de ", vertex, "eh o -> ", edge);
          }
        }

        //     console.log(
        //       "o custo de ",
        //       vertex,
        //       "na iteração ",
        //       i,
        //       "na tabela de custos eh -> ",
        //       this.memoization[i][vertex]
        //     );
      }
    }
    // console.log(this.memoization);
    // console.log(this.sucessor);
    // ----------------------------------------------------------- //

    // find solution

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
    // console.log(
    //   "\n\nSolucao----------------------------------------------------------"
    // );
    // console.log(this.solutionSet);
    // console.log(
    //   "\n\nfim Solucao----------------------------------------------------------"
    // );

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
    console.log(response);

    return response;
  }
}
