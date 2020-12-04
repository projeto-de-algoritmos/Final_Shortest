import React, { useState } from "react";
import { Form } from "@rocketseat/unform";
import Graph from "react-graph-vis";
import {
  Container,
  Header,
  Body,
  Menu,
  Text,
  Bottom,
  SubText,
  Conditional,
  FormContainer,
  Input,
} from "./styles";
import options from "../../jsons/options.json";
import GraphStructure from "../../functions/graph";

function Home() {
  const [renderizedGraph, setRenderizedGraph] = useState(null);
  const [totalNodes, setTotalNodes] = useState(0);
  const [destinyInput, setDestinyInput] = useState("");
  const [vertexs, setVertexs] = useState({});
  const graph = new GraphStructure();
  const events = {
    // função que captura os nós selecionados pelo usuario
    select: function (event) {
      var { nodes, edges } = event;

      // adiciona os nos e arestas selecionados no state
      console.log(nodes);
    },
  };

  function handleInput() {
    console.log(graph.vertexs);
    if (!vertexs.hasOwnProperty(destinyInput)) {
      alert("Vértice não existente!");
    }
  }

  function renderGraph(id) {
    if (id.target.id == 0) {
      console.log("criar grafo aleatorio");
    } else if (id.target.id == 1) {
      setRenderizedGraph(graph.exampleOne());
    } else if (id.target.id == 2) {
      let response = graph.exampleTwo();
      setVertexs(response.vertexs);
      setRenderizedGraph(response.dict);
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
            Grafo Aleatório
          </button>
          <button id="1" onClick={(id) => renderGraph(id)}>
            Exemplo 1 - Aula
          </button>

          <button id="2" onClick={(id) => renderGraph(id)}>
            Exemplo 2 - Aula
          </button>

          {renderizedGraph ? (
            <Conditional>
              <FormContainer>
                <Form>
                  <Input
                    value={destinyInput}
                    required
                    onChange={(destinyInput) =>
                      setDestinyInput(destinyInput.target.value)
                    }
                    placeholder="Nó Destino"
                  />
                </Form>
                <button type="submit" onClick={handleInput}>
                  Menor Caminho
                </button>
              </FormContainer>
            </Conditional>
          ) : null}
        </Menu>
        {renderizedGraph ? (
          <Graph graph={renderizedGraph} options={options} events={events} />
        ) : null}
      </Body>
      <Bottom>
        <Text>Custo Total: </Text>
      </Bottom>
    </Container>
  );
}
export default Home;
