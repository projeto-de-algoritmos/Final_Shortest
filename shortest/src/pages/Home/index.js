import React, { useEffect, useState } from "react";
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
  const [clickedVertex, setClickedVertex] = useState("");
  const [example, setExample] = useState(0);
  const graph = new GraphStructure();
  const events = {
    // função que captura os nós selecionados pelo usuario
    select: function (event) {
      var { nodes, edges } = event;

      // adiciona os nos e arestas selecionados no state
      setClickedVertex(nodes[0]);
    },
  };

  function handleInput() {
    setRenderizedGraph(null);
    let renderized = renderGraph(example);
    setTimeout(() => {
      setRenderizedGraph(renderized);
      console.log(renderized);
    }, 100);
    if (!vertexs.hasOwnProperty(destinyInput)) {
      alert("Vértice não existente!");
      return;
    }

    try {
      let new_renderized = renderizedGraph;
      let index;
      let currentNode = destinyInput;
      for (let i = 0; i < new_renderized.nodes.length; ++i)
        if (new_renderized.nodes[i].id === currentNode) index = i;
      console.log(index);
      console.log(new_renderized.nodes[index]);
      new_renderized.nodes[index]["color"] = "#6e3f6a";
      console.log(new_renderized);
      setRenderizedGraph(null);
      setTimeout(() => {
        setRenderizedGraph(new_renderized);
      }, 50);
    } catch (e) {}
  }

  function renderGraph(id) {
    console.log("________________________");
    if (id == 0) {
      console.log("criar grafo aleatorio");
    } else if (id == 1) {
      let response = graph.exampleOne();
      setTotalNodes(response.total);
      setVertexs(response.vertexs);
      setRenderizedGraph(response.dict);
      setExample(1);
      return response.dict;
    } else if (id == 2) {
      let response = graph.exampleTwo();
      setTotalNodes(response.total);
      setVertexs(response.vertexs);
      setRenderizedGraph(response.dict);
      setExample(2);
      return response.dict;
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
          <button id="0" onClick={(id) => renderGraph(id.target.id)}>
            Grafo Aleatório
          </button>
          <button id="1" onClick={(id) => renderGraph(id.target.id)}>
            Exemplo 1 - Aula
          </button>

          <button id="2" onClick={(id) => renderGraph(id.target.id)}>
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
                    placeholder="Vértice Destino"
                  />
                </Form>
                <button type="submit" onClick={handleInput}>
                  Aplicar
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
        <SubText>Número de Vértices: {totalNodes}</SubText>
        <SubText>Custo Total: {cost}</SubText>
      </Bottom>
    </Container>
  );
}
export default Home;
