class Graph {
  constructor() {
    this.vertexs = {}; // implementado assim para poder achar qualquer nó em O(1) (passando o id)
    this.memoization = {};
    this.totalNodes = 0;
    this.sucessor = {};
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

    // ----------------------------------------------------------- //
    for (let i = 1; i <= this.totalNodes - 1; ++i) {
      for (let vertex in this.vertexs) {
        console.log(
          "\n\n----------------------------------------------------------"
        );
        console.log("\n\no I eh -> ", i);
        console.log("vertice atual eh -> ", vertex);
        this.memoization[i][vertex] = this.memoization[i - 1][vertex]; // o valor atual recebe o mesmo valor da coluna acima

        console.log(
          "esse valor[",
          i,
          ",",
          vertex,
          "] ->",
          this.memoization[i][vertex]
        );
        console.log(
          "recebera este[",
          i - 1,
          ",",
          vertex,
          "]->",
          this.memoization[i - 1][vertex]
        );
        // console.log(this.memoization[i - 1]);
        console.log(
          "vizinhos de ",
          vertex,
          "-> ",
          this.vertexs[vertex].neighbors
        );
        console.log(this.memoization);
        // para cada vizinho do nó
        for (let edge in this.vertexs[vertex].neighbors) {
          console.log("aresta atual -> ", edge);
          console.log(
            "esse valor[",
            i,
            ", ",
            vertex,
            "]-> ",
            this.memoization[i][vertex]
          );
          console.log(
            "eh maior q este?[",
            i - 1,
            ", ",
            edge,
            "]-> ",
            this.memoization[i - 1][edge]
          );
          console.log(
            "mais esse? -> ",
            this.vertexs[vertex].neighbors[edge].weight
          );
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
            console.log("se sim entao iremos fazer o swap");
            this.memoization[i][vertex] =
              this.memoization[i - 1][edge] +
              this.vertexs[vertex].neighbors[edge].weight;
            this.sucessor[vertex] = edge;
            console.log("o sucessor de ", vertex, "eh o -> ", edge);
          }
        }

        console.log(
          "o custo de ",
          vertex,
          "na iteração ",
          i,
          "na tabela de custos eh -> ",
          this.memoization[i][vertex]
        );
      }
    }
    console.log(this.memoization);
    console.log(this.sucessor);
    // ----------------------------------------------------------- //

    // find solution

    for (let vertex in this.vertexs) {
      let aux = this.memoization[this.totalNodes - 1][vertex];
      if (aux == Number.MAX_SAFE_INTEGER) {
        this.solutionSet[vertex] = null;
        continue;
      }
      for (let i = this.totalNodes - 2; i >= 0; --i) {
        if (this.memoization[i][vertex] == aux) {
          this.solutionSet[vertex] = i;
        }
      }
    }
    console.log(
      "\n\nSolucao----------------------------------------------------------"
    );
    console.log(this.solutionSet);
    console.log(
      "\n\nfim Solucao----------------------------------------------------------"
    );
  }
}
