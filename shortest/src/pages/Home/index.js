import React, { useState, useEffect, useLayoutEffect } from "react";
import Graph from "react-graph-vis";
import { Container, Header, Body, Menu, Text, Bottom } from "./styles";
import options from "../../jsons/options.json";
import GraphStructure from "../../functions/graph";

function Home() {
  const [renderizedGraph, setRenderizedGraph] = useState(null);
  const [totalNodes, setTotalNodes] = useState(0);
  const graph = new GraphStructure();
  const events = {
    // função que captura os nós selecionados pelo usuario
    select: function (event) {
      var { nodes, edges } = event;

      // adiciona os nos e arestas selecionados no state
      console.log(nodes);
    },
  };

  function renderGraph(id) {
    if (id.target.id == 0) {
      console.log("criar grafo aleatorio");
    } else if (id.target.id == 1) {
      setRenderizedGraph(graph.exampleOne());
    } else if (id.target.id == 2) {
      setRenderizedGraph(graph.exampleTwo());
    }
  }
  return (
    <Container>
      <Header>
        <Text>Menor caminho</Text>
      </Header>
      <Body>
        <Menu>
          <Text>Menu</Text>
          <button id="0" onClick={(id) => renderGraph(id)}>
            Criar Grafo Aleatório
          </button>
          <button id="1" onClick={(id) => renderGraph(id)}>
            Exemplo 1 - Aula
          </button>

          <button id="2" onClick={(id) => renderGraph(id)}>
            Exemplo 2 - Aula
          </button>
        </Menu>
        {renderizedGraph ? (
          <Graph graph={renderizedGraph} options={options} events={events} />
        ) : null}

        {/* <Graph
          graph={{ nodes: [{ id: 1 }, { id: 2 }], edges: [{ from: 1, to: 2 }] }}
          options={options}
          events={events}
        /> */}
      </Body>
      <Bottom>
        <Text>Custo Total: </Text>
      </Bottom>
    </Container>
  );
}
export default Home;
