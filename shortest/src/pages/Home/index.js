import React, { useState } from "react";
import Graph from "react-graph-vis";
import { Container, Header, Body, Menu, Text, Bottom } from "./styles";
import options from "./options.json";

function Home() {
  const events = {
    // função que captura os nós selecionados pelo usuario
    select: function (event) {
      var { nodes, edges } = event;

      // adiciona os nos e arestas selecionados no state
      console.log(nodes);
    },
  };
  return (
    <Container>
      <Header>
        <Text>Menor caminho</Text>
      </Header>
      <Body>
        <Menu>
          <Text>Menu</Text>
          <button onClick={() => {}}>Criar Grafo Aleatório</button>
          <button onClick={() => {}}>Solução</button>
        </Menu>

        <Graph
          graph={{ nodes: [{ id: 1 }, { id: 2 }], edges: [{ from: 1, to: 2 }] }}
          options={options}
          events={events}
        />
      </Body>
      <Bottom>
        <Text>Custo Total: </Text>
      </Bottom>
    </Container>
  );
}
export default Home;
