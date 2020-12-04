import React, { useState } from "react";
import Graph from "react-graph-vis";
import { Container, Header, Body, Menu, Text } from "./styles";

function Home() {
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
        />
      </Body>
    </Container>
  );
}
export default Home;
