class Graph {

  constructor() {
    this.vertexs = {};  // implementado assim para poder achar qualquer nó em O(1) (passando o id)
  }

  // adição de um vertice 'id' no grafo
  addVertex(id) {
    let vertex = {
      id: id,
      neighbors: {}, // implementado assim para poder achar qualquer nó vizinho em O(1) (passando o id)
      degree: 0,
    };

    this.vertexs[id] = vertex;
  }

  // OBS: parametro 'type' opcional (se nao for passado ele considera uma aresta orientada (a->c))
  // se for passado o valor 'undirected' em 'type', ele alem de fazer a aresta (a->c) ele faz a aresta (c->a)
  addEdge(origin, destiny, type, weight) {

    let new_edge = {
      origin: origin,
      destiny: destiny,
      weight: weight,
    };
    this.vertexs[origin]['neighbors'][destiny] = new_edge;
    this.vertexs[origin]['degree']++;

    if (type === 'undirected') {
      let new_inverse_edge = {
        origin: destiny,
        destiny: origin,
        weight: weight,
      };

      this.vertexs[destiny]['neighbors'][origin] = new_inverse_edge;
      this.vertexs[destiny]['degree']++;
    }
  }
}

