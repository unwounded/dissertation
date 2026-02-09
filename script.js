// Load saved tree or default
let treeData = JSON.parse(localStorage.getItem("treeData")) || {
  name: "Root",
  collapsed: false,
  children: []
};

// Save tree
function saveTree() {
  localStorage.setItem("treeData", JSON.stringify(treeData));
}

// Render tree
function renderTree() {

  const container = document.getElementById("tree");
  container.innerHTML = "";

  const ul = document.createElement("ul");
  ul.className = "tree";

  ul.appendChild(createNode(treeData, null));

  container.appendChild(ul);
}

// Create node
function createNode(node, parent) {

  const li = document.createElement("li");

  const nodeDiv = document.createElement("div");
  nodeDiv.className = "node";

  // Collapse toggle
  const toggle = document.createElement("span");
  toggle.className = "toggle";

  if (node.children.length > 0) {
    toggle.textContent = node.collapsed ? "▶" : "▼";

    toggle.onclick = () => {
      node.collapsed = !node.collapsed;
      saveTree();
      renderTree();
    };
  } else {
    toggle.textContent = "•";
  }

  nodeDiv.appendChild(toggle);

  // Name
  const name = document.createElement("span");
  name.textContent = node.name;
  nodeDiv.appendChild(name);

  // Make Child button
  const addBtn = document.createElement("button");
  addBtn.textContent = "+Child";

  addBtn.onclick = () => {

    const childName = prompt("Child name:");

    if (!childName) return;

    node.children.push({
      name: childName,
      collapsed: false,
      children: []
    });

    saveTree();
    renderTree();
  };

  nodeDiv.appendChild(addBtn);

  // Rename button
  const renameBtn = document.createElement("button");
  renameBtn.textContent = "Rename";

  renameBtn.onclick = () => {

    const newName = prompt("New name:", node.name);

    if (!newName) return;

    node.name = newName;

    saveTree();
    renderTree();
  };

  nodeDiv.appendChild(renameBtn);

  // Delete button
  if (parent !== null) {

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.onclick = () => {

      if (!confirm("Delete node?")) return;

      const index = parent.children.indexOf(node);

      parent.children.splice(index, 1);

      saveTree();
      renderTree();
    };

    nodeDiv.appendChild(deleteBtn);
  }

  li.appendChild(nodeDiv);

  // Children
  if (!node.collapsed && node.children.length > 0) {

    const ul = document.createElement("ul");

    node.children.forEach(child => {
      ul.appendChild(createNode(child, node));
    });

    li.appendChild(ul);
  }

  return li;
}

//
// EXPORT TREE
//
function exportTree() {

  const dataStr = JSON.stringify(treeData, null, 2);

  const blob = new Blob([dataStr], { type: "application/json" });

  const link = document.createElement("a");

  link.href = URL.createObjectURL(blob);

  link.download = "tree.json";

  link.click();
}

//
// IMPORT TREE
//
function importTree(event) {

  const file = event.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = function(e) {

    treeData = JSON.parse(e.target.result);

    saveTree();

    renderTree();
  };

  reader.readAsText(file);
}

// Initial render
renderTree();
