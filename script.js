let treeData = {
  name: "Root",
  children: []
};

let selectedNode = treeData;

function renderTree() {
  const container = document.getElementById("tree");
  container.innerHTML = "";
  container.appendChild(createNodeElement(treeData));
}

function createNodeElement(node) {
  const li = document.createElement("li");
  li.textContent = node.name;

  li.onclick = function(e) {
    e.stopPropagation();
    selectedNode = node;
    highlightSelected();
  };

  if (node.children.length > 0) {
    const ul = document.createElement("ul");

    node.children.forEach(child => {
      ul.appendChild(createNodeElement(child));
    });

    li.appendChild(ul);
  }

  return li;
}

function addNode() {
  const input = document.getElementById("nodeName");
  const name = input.value.trim();

  if (!name) return;

  selectedNode.children.push({
    name: name,
    children: []
  });

  input.value = "";
  renderTree();
}

function highlightSelected() {
  renderTree();
}

renderTree();
