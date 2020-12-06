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
import exampleOne from "../../jsons/example1.json";
import exampleTwo from "../../jsons/example2.json";
import GraphStructure from "../../functions/graph";

const graph = new GraphStructure();
var renderWithNodeDestiny = null;

function Home() {
  const [standart, setStandart] = useState(null);
  const [renderizedGraph, setRenderizedGraph] = useState(null);
  const [totalNodes, setTotalNodes] = useState(0);
  const [destinyInput, setDestinyInput] = useState("");
  const [clickedVertex, setClickedVertex] = useState("");
  const [path, setPath] = useState([]);
  const [cost, setCost] = useState(0);
  const [example, setExample] = useState(0);
  const [applied, setApplied] = useState(false);

  const events = {
    // função que captura os nós selecionados pelo usuario
    select: function (event) {
      var { nodes, edges } = event;

      // adiciona os nos e arestas selecionados no state
      if (nodes.length == 0 || destinyInput == "") {
        console.log(nodes);
        return;
      }
      setClickedVertex(nodes[0]);
      ApplyButton();
      // alert("test");
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
  function renderize(graph, time) {
    setRenderizedGraph(null);
    setTimeout(() => {
      setRenderizedGraph(graph);
    }, time);
  }

  function ApplyButton() {
    setApplied(true);
    if (!graph.getVertex().hasOwnProperty(destinyInput)) {
      alert("Vértice não existente!");
      setApplied(false);
      return;
    }
    // renderize(converter(), 15);
    let new_renderized = renderGraph(example);
    let index;
    let currentNode = destinyInput;

    // achando o nó escolhido pelo usuario e mudando a cor dele no grafo
    for (let i = 0; i < new_renderized.nodes.length; ++i) {
      if (new_renderized.nodes[i].id === currentNode) {
        index = i;
      }
    }
    new_renderized.nodes[index]["color"] = "#6e3f6a";

    // renderizando com a cor alterada
    renderize(new_renderized, 25);
    console.log("novo renderizado", new_renderized);
    renderWithNodeDestiny = new_renderized;
    return new_renderized;
  }
  function converter() {
    let nodes = [];
    let edges = [];

    for (let vertex in graph.vertexs) {
      let new_node = {
        id: vertex,
        label: vertex,
        title: "node 1",
      };
      nodes.push(new_node);

      for (let edge in graph.vertexs[vertex].neighbors) {
        let new_edge = {
          from: graph.vertexs[vertex].neighbors[edge].origin,
          to: graph.vertexs[vertex].neighbors[edge].destiny,
          label: graph.vertexs[vertex].neighbors[edge].weight.toString(),
          color: "#FF0",
        };
        edges.push(new_edge);
      }
    }

    return {
      nodes: nodes,
      edges: edges,
    };
  }

  function renderGraph(id) {
    if (id == 0) {
      console.log("criar grafo aleatorio");
      console.log(renderWithNodeDestiny);
    } else if (id == 1) {
      graph.clear(); // zerando a estrutura

      // carregando o grafo de um arquivo externo
      for (let vertex of exampleOne.nodes) {
        graph.addVertex(vertex.id);
      }
      for (let edge of exampleOne.edges) {
        graph.addEdge(edge.origin, edge.destiny, edge.weight);
      }

      // renderizando na tela
      let new_renderized = converter();

      setStandart(new_renderized);
      setRenderizedGraph(null);
      setExample(id);
      setTotalNodes(graph.getTotalVertex());
      setTimeout(() => {
        setRenderizedGraph(new_renderized);
      }, 50);

      return new_renderized;
    } else if (id == 2) {
      graph.clear();
      for (let vertex of exampleTwo.nodes) {
        graph.addVertex(vertex.id);
      }
      for (let edge of exampleTwo.edges) {
        graph.addEdge(edge.origin, edge.destiny, edge.weight);
      }

      // renderizando na tela
      let new_renderized = converter();

      setRenderizedGraph(null);
      setExample(id);
      setTotalNodes(graph.getTotalVertex());
      setTimeout(() => {
        setRenderizedGraph(new_renderized);
      }, 50);
      return new_renderized;
    }
  }

  function drawPath(path) {
    let renderized = renderWithNodeDestiny;
    console.log(renderized);
    for (let i = 0; i < path.length; ++i) {
      for (let j = 0; j < totalNodes; ++j) {
        if (renderized.nodes[j].id == path[i]) {
          console.log(renderized.nodes[j].id);
          if (i == 0) {
            renderized.nodes[j]["color"] = "#477b4b";
          } else if (i == path.length - 1) {
            renderized.nodes[j]["color"] = "#6e3f6a";
          } else {
            renderized.nodes[j]["color"] = "#91c095";
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
          renderized.edges[edge]["color"] = "#91c095";
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
                    Clique em algum vértice, do grafo ao lado, para saber o
                    menor caminho
                  </SubTextInstructions>
                ) : (
                  <SubTextInstructions>
                    Agora selecione um vértice de destino (v ∈ G) ⇊
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
