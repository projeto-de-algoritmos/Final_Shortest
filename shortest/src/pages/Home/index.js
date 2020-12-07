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
  GraphContainer,
} from "./styles";
import options from "../../jsons/options.json";
import exampleOne from "../../jsons/example1.json";
import exampleTwo from "../../jsons/example2.json";
import random from "../../jsons/random.json";
import GraphStructure from "../../functions/graph";

const graph = new GraphStructure();
function Home() {
  const [renderizedGraph, setRenderizedGraph] = useState(null);
  const [totalNodes, setTotalNodes] = useState(0);
  const [destinyInput, setDestinyInput] = useState("");
  const [path, setPath] = useState([]);
  const [cost, setCost] = useState(0);
  const [example, setExample] = useState(0);
  const [applied, setApplied] = useState(false);
  const [lastValid, setLastValid] = useState("");
  const [memoization, setMemoization] = useState("");

  const events = {
    // função que captura os nós selecionados pelo usuario
    select: function (event) {
      var { nodes, edges } = event;

      // se nao tiver vertice selecionado ou o input vazio, retorna
      if (
        nodes.length == 0 ||
        destinyInput == "" ||
        !graph.getVertex().hasOwnProperty(destinyInput) ||
        !applied
      ) {
        return;
      }
      if (destinyInput && nodes[0]) {
        let response = graph.findSolution(nodes[0], destinyInput);
        if (response == -1) {
          alert("Não existe caminho!");
        } else if (response == -2) {
          alert("Origem e destino iguais! Custo = 0");
          ApplyButton();
          setCost(0);
        } else {
          ApplyButton();
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

  function ApplyButton(is_user) {
    if (destinyInput == "") {
      alert("Insira um vértice no campo 'Vértice Destino'");
      return;
    }
    setApplied(true);

    if (!graph.getVertex().hasOwnProperty(destinyInput)) {
      let response = "Vertice '" + destinyInput + "' não existente!";
      alert(response);
      setApplied(false);
      setDestinyInput("");
      return;
    }
    setLastValid(destinyInput);

    let new_renderized = renderGraph(example, 0);
    let index;
    let currentNode = destinyInput;
    //if (is_user === 1) {
    // acha todas as soluções pro nó passado

    graph.shortestPath(destinyInput);
    if (is_user === 1) console.log('memoization', graph.memoization);
    //}
    // achando o nó escolhido pelo usuario e mudando a cor dele no grafo
    for (let i = 0; i < new_renderized.nodes.length; ++i) {
      if (new_renderized.nodes[i].id === currentNode) {
        index = i;
      }
    }
    new_renderized.nodes[index]["color"] = "#91c095";

    // renderizando com a cor alterada
    renderize(new_renderized, 25);
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

  function renderGraph(id, is_user) {
    if (is_user) {
      setApplied(false);
      setDestinyInput("");
      setCost(0);
    }
    if (id == 0) {
      graph.clear(); // zerando a estrutura

      for (let vertex of random.nodes) {
        graph.addVertex(vertex.id);
      }
      for (let edge of random.edges) {
        graph.addEdge(edge.origin, edge.destiny, edge.weight);
      }
      let new_renderized = converter();

      setRenderizedGraph(null);
      setExample(id);
      setTotalNodes(graph.getTotalVertex());
      renderize(new_renderized, 50);

      return new_renderized;
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

      setRenderizedGraph(null);
      setExample(id);
      setTotalNodes(graph.getTotalVertex());
      renderize(new_renderized, 50);

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
      renderize(new_renderized, 50);

      return new_renderized;
    }
  }

  function drawPath(path) {
    let renderized = ApplyButton(example);
    for (let i = 0; i < path.length; ++i) {
      for (let j = 0; j < totalNodes; ++j) {
        if (renderized.nodes[j].id == path[i]) {
          if (i == 0) {
            renderized.nodes[j]["color"] = "#c397c0";
          } else if (i == path.length - 1) {
            renderized.nodes[j]["color"] = "#91c095";
          } else {
            renderized.nodes[j]["color"] = "#a4609e";
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
          renderized.edges[edge]["color"] = "#a4609e";
        }
      }
    }
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
          <button id="0" onClick={(id) => renderGraph(id.target.id, 1)}>
            Grafo Aleatório
          </button>
          <button id="1" onClick={(id) => renderGraph(id.target.id, 1)}>
            Exemplo 1 - Aula
          </button>

          <button id="2" onClick={(id) => renderGraph(id.target.id, 1)}>
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
                    Abaixo selecione um vértice de destino
                  </SubTextInstructions>
                )}
                <Form>
                  <Input
                    value={destinyInput}
                    required
                    onChange={(input) => {
                      setDestinyInput(input.target.value);
                    }}
                    placeholder="Vértice Destino"
                  />
                </Form>
                <button type="submit" onClick={() => ApplyButton(1)}>
                  Aplicar
                </button>
              </FormContainer>
            </Conditional>
          ) : (
            <SubTextInstructions>
              Primeiro renderize um dos grafos acima
            </SubTextInstructions>
          )}
        </Menu>
        {renderizedGraph ? (
          <GraphContainer>
            <Graph graph={renderizedGraph} options={options} events={events} />
          </GraphContainer>
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
