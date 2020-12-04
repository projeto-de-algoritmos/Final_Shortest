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
  SubTextInstructions,
} from "./styles";
import options from "../../jsons/options.json";
import GraphStructure from "../../functions/graph";

function Home() {
  const [renderizedGraph, setRenderizedGraph] = useState(null);
  const [totalNodes, setTotalNodes] = useState(0);
  const [destinyInput, setDestinyInput] = useState("");
  const [vertexs, setVertexs] = useState({});
  const [clickedVertex, setClickedVertex] = useState("");
  const [path, setPath] = useState([]);
  const [cost, setCost] = useState(0);
  const [example, setExample] = useState(0);
  const [applied, setApplied] = useState(false);
  const graph = new GraphStructure();
  const events = {
    // função que captura os nós selecionados pelo usuario
    select: function (event) {
      var { nodes, edges } = event;

      // adiciona os nos e arestas selecionados no state
      setClickedVertex(nodes[0]);
      console.log(totalNodes);
      graph.vertexs = vertexs;
      graph.totalNodes = totalNodes;
      console.log(nodes[0]);
      console.log(destinyInput);
      if (destinyInput && nodes[0]) {
        let response = graph.shortestPath(nodes[0], destinyInput);
        if (response == -1) {
          alert("Não existe caminho!");
        } else if (response == -2) {
          alert("Origem e destino iguais! Custo = 0");
        } else {
          setPath(response.path);
          setCost(response.cost);
          drawPath(response.path);
        }
      }
    },
  };

  function ApplyButton() {
    setApplied(true);
    // setRenderizedGraph(null);
    // setTimeout(() => {
    //   setRenderizedGraph(renderized);
    //   console.log(renderized);
    // }, 50);
    if (!vertexs.hasOwnProperty(destinyInput)) {
      alert("Vértice não existente!");
      setApplied(false);
      return;
    }
    let renderized = renderGraph(example);

    try {
      let new_renderized = renderized;
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
      console.log(response.total);
      setVertexs(response.vertexs);
      setExample(1);
      console.log(response.dict);
      setTimeout(() => {
        setRenderizedGraph(null);
        setRenderizedGraph(response.dict);
      }, 50);
      return response.dict;
    } else if (id == 2) {
      let response = graph.exampleTwo();
      setTotalNodes(response.total);
      console.log(response.total);
      setVertexs(response.vertexs);
      setExample(2);
      setRenderizedGraph(null);
      setTimeout(() => {
        setRenderizedGraph(response.dict);
      }, 50);
      return response.dict;
    }
  }

  function drawPath(path) {
    console.log(totalNodes);
    // setTimeout(() => {
    //   ApplyButton();
    // }, 200);
    graph.vertexs = vertexs;
    graph.totalNodes = totalNodes;
    let renderized = renderGraph(example);
    console.log(renderized.nodes[0]);
    for (let i = 0; i < path.length; ++i) {
      for (let j = 0; j < totalNodes; ++j) {
        if (renderized.nodes[j].id == path[i]) {
          console.log(renderized.nodes[j].id);
          if (i == 0) {
            renderized.nodes[j]["color"] = "#91c095";
          } else if (i == path.length - 1) {
            renderized.nodes[j]["color"] = "#6e3f6a";
          } else {
            renderized.nodes[j]["color"] = "#8b0000";
          }
        }
      }
    }

    for (let i = 0; i < path.length - 1; ++i) {
      for (let edge in renderized.edges) {
        if (
          renderized.edges[edge].from == path[i] &&
          renderized.edges[edge].to == path[i + 1]
        ) {
          renderized.edges[edge]["color"] = "#8b0000";
        }
      }
    }
    console.log(renderized);
    console.log(path);
    setRenderizedGraph(null);
    setTimeout(() => {
      setRenderizedGraph(renderized);
    }, 150);
  }

  return (
    <Container>
      <Header>
        <Text>Menor Caminho</Text>
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
                {applied ? (
                  <SubTextInstructions>
                    Clique em algum nó para saber o menor caminho
                  </SubTextInstructions>
                ) : (
                  <SubTextInstructions>
                    Agora selecione um nó (v ∈ G) ⇊
                  </SubTextInstructions>
                )}
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
                <button type="submit" onClick={ApplyButton}>
                  Aplicar
                </button>
              </FormContainer>
            </Conditional>
          ) : (
            <SubTextInstructions>
              Primeiro renderize um dos grafos acima ⇈
            </SubTextInstructions>
          )}
        </Menu>
        {renderizedGraph ? (
          <Graph graph={renderizedGraph} options={options} events={events} />
        ) : null}
      </Body>
      <Bottom>
        <SubText>Número de Vértices: {totalNodes}</SubText>
        <SubText>Menor Custo Total: {cost}</SubText>
      </Bottom>
    </Container>
  );
}
export default Home;
