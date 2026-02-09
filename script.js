// Load saved tree or create default
let treeData = JSON.parse(localStorage.getItem("treeData")) || {
  name: "Root",
  children: []
};

let selectedNode = null;

// Save tree to browser
function saveTree() {
  localStorage.setItem("treeData", JSON.stringify(treeData));
}

// Render entire tree
function renderTree() {
  const container = document.getElementById("tree");
  container.innerHTML = "";

  const ul = document.createElement("ul");
  ul.appendChild(createNodeElement(treeData));

  container.appendChild(ul);
}

// Create each node element
function createNodeElement(node) {

  const li = document.createElement("li");

  // Node label
  const label = document.createElement("span");
  label.textContent = node.name;
  label.className = "node-label";

  label.onclick = (e) => {
    e.stopPropagation();
    selectedNode = node;
    renderTree();
  };

  li.appendChild(label);

  // Highlight selected node
  if (node === selectedNode) {
    label.style.backgroundColor = "#cce5ff";
  }

  // Make Child button
  const addBtn = document.createElement("button");
  addBtn.textContent = "Make Child";
  addBtn.style.marginLeft = "10px";

  addBtn.onclick = (e) => {
    e.stopPropagation();

    const childName = prompt("Enter child node name:");

    if (!childName) return;

    node.children.push({
      name: childName,
      children: []
    });

    saveTree();
    renderTree();
  };

  li.appendChild(addBtn);

  // Children container
  if (node.children.length > 0) {

    const ul = document.createElement("ul");

    node.children.forEach(child => {
      ul.appendChild(createNodeElement(child));
    });

    li.appendChild(ul);
  }

  return li;
}

// Initial render
renderTree();
