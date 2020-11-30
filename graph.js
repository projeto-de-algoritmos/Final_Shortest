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
}

