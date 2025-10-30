# JSON Tree Visualizer (React + React Flow)

A beautiful, interactive JSON **Tree Visualizer** built with **React** and **@xyflow/react (React Flow)**.  
Paste your JSON, click **Generate Tree**, and instantly see a colorful, connected tree structure — with **search & highlight** support!

---

## Features

- Paste or type any valid JSON  
- Automatic tree visualization with hierarchical layout  
- Color-coded nodes by type:
  - 🟣 **Objects**
  - 🟢 **Arrays**
  - 🟡 **Primitives**
- Smooth zoom, pan, and fit view  
- Search by **JSON path** (e.g. `$.user.address.city`) and highlight matched nodes  
- Modular and well-structured code for easy extension  

---

## 🧩 Tech Stack

- **React 18+**
- **@xyflow/react (React Flow)** for graph visualization
- **JavaScript (ES6+)**
- No external backend required

---

## 🏗️ Project Structure

```bash
src/
│
├── components/
│   ├── Render/
│   │   ├── Render.jsx                 # Entry component with ReactFlowProvider
│   │   ├── RenderFlowTree.jsx         # Core visualization logic
│   │   ├── JsonInputPanel.jsx         # JSON input + Search panel
│   │   ├── utils/
│   │   │   ├── colors.js              # Node color constants
│   │   │   └── generateTreeData.js    # Recursive JSON → nodes/edges generator
│   │   └── styles/
│   │       └── panelStyles.js         # Shared inline styles for panel UI
│
└── App.jsx                            # Renders <Render /> component


```


## ⚙️ Installation & Setup
### 1️⃣ Clone the repository

```

git clone https://github.com/Amank7501/json-tree-visualizer.git
cd json-tree-visualizer
```
### Install dependencies
```
npm install
```
### Run the app
```
npm start
