import React from "react";
import CytoscapeComponent from "react-cytoscapejs";

// Dữ liệu giao dịch JSON của anh
const data = {
  address: "0x59Ae338842dCAbdEf8E7c81B5e8e47eA008cF3cF",
  transactions: [
    {
      blockNumber: "8479121",
      from: "0x59ae338842dcabdef8e7c81b5e8e47ea008cf3cf",
      to: "0xe71a3bd05fc7032970e99638da31b9332d853018",
      value: "40000000000000000",
    },
    {
      blockNumber: "8475456",
      from: "0xe71a3bd05fc7032970e99638da31b9332d853018",
      to: "0x59ae338842dcabdef8e7c81b5e8e47ea008cf3cf",
      value: "10000000000000000",
    },
    {
      blockNumber: "8470356",
      from: "0xe71a3bd05fc7032970e99638da31b9332d853018",
      to: "0x59ae338842dcabdef8e7c81b5e8e47ea008cf3cf",
      value: "10000000000000000",
    },
    {
      blockNumber: "8463329",
      from: "0xe71a3bd05fc7032970e99638da31b9332d853018",
      to: "0x59ae338842dcabdef8e7c81b5e8e47ea008cf3cf",
      value: "20000000000000000",
    },
    {
      blockNumber: "8451976",
      from: "0x59ae338842dcabdef8e7c81b5e8e47ea008cf3cf",
      to: "0xe71a3bd05fc7032970e99638da31b9332d853018",
      value: "20000000000000000",
    },
    {
      blockNumber: "8451423",
      from: "0xf192e0d79fc75134d6d291f6968d3a8de0c6f734",
      to: "0x59ae338842dcabdef8e7c81b5e8e47ea008cf3cf",
      value: "50000000000000000",
    },
    {
      blockNumber: "8451389",
      from: "0xe71a3bd05fc7032970e99638da31b9332d853018",
      to: "0x59ae338842dcabdef8e7c81b5e8e47ea008cf3cf",
      value: "1000000000000000",
    },
  ],
};

// Chuyển wei (string) sang ETH (number)
const weiToEth = (wei) => Number(wei) / 1e18;

export default function TransactionGraphTest() {
  const { address, transactions } = data;

  // Tạo tập các địa chỉ node (unique)
  const nodesSet = new Set();
  transactions.forEach((tx) => {
    nodesSet.add(tx.from.toLowerCase());
    nodesSet.add(tx.to.toLowerCase());
  });

  // Biến set thành array để làm nodes
  const nodes = Array.from(nodesSet).map((addr) => ({
    data: {
      id: addr,
      label: addr === address.toLowerCase() ? "🟢 " + addr : addr,
    },
    style:
      addr === address.toLowerCase()
        ? { backgroundColor: "limegreen", color: "black", fontWeight: "bold" }
        : {},
  }));

  // Tạo edges từ giao dịch
  const edges = transactions.map((tx, index) => ({
    data: {
      id: `e${index}`,
      source: tx.from.toLowerCase(),
      target: tx.to.toLowerCase(),
      label: `${weiToEth(tx.value)} ETH`,
    },
    style: {
      label: `${weiToEth(tx.value).toFixed(5)} ETH`,
      "text-rotation": "autorotate",
      "curve-style": "bezier",
      "target-arrow-shape": "triangle",
      "target-arrow-color": "#888",
      lineColor: "#888",
    },
  }));

  // Kết hợp elements node + edge
  const elements = [...nodes, ...edges];

  // Stylesheet tùy chỉnh cho Cytoscape
  const stylesheet = [
    {
      selector: "node",
      style: {
        label: "data(label)",
        "text-wrap": "wrap",
        "text-max-width": 80,
        "background-color": "#0074D9",
        color: "#fff",
        "text-valign": "center",
        "text-halign": "center",
        "font-size": 8,
        "overlay-padding": "6px",
        "z-index": 10,
      },
    },
    {
      selector: "node[style]",
      style: {
        "background-color": "data(style.backgroundColor)",
        color: "data(style.color)",
        "font-weight": "data(style.fontWeight)",
      },
    },
    {
      selector: "edge",
      style: {
        width: 2,
        "line-color": "#888",
        "target-arrow-color": "#888",
        "target-arrow-shape": "triangle",
        label: "data(label)",
        "font-size": 6,
        "text-background-opacity": 1,
        "text-background-color": "#fff",
        "text-background-padding": 2,
        "text-border-opacity": 1,
        "text-border-color": "#888",
        "text-border-width": 0.5,
      },
    },
  ];

  return (
    <div>
      <h3>Transaction Graph for {address}</h3>
      <CytoscapeComponent
        elements={elements}
        style={{ width: "100%", height: "600px", border: "1px solid #ccc" }}
        layout={{ name: "cose" }}
        stylesheet={stylesheet}
      />
    </div>
  );
}
