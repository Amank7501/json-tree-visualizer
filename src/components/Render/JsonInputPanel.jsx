import React from "react";
import { panelStyles } from "./styles/panelStyles.js";

//Handles JSON input + Search controls
const JsonInputPanel = ({
  jsonInput,
  setJsonInput,
  jsonError,
  handleClear,
  handleGenerateTree,
  searchPath,
  setSearchPath,
  handleSearch,
  searchMessage,
}) => {
  return (
    <div style={panelStyles.container}>
      <h3 style={{ margin: "0 0 8px" }}>JSON Input</h3>
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        rows={10}
        style={panelStyles.textarea}
        placeholder="Paste your JSON here..."
      />
      {jsonError && <p style={{ color: "red", fontSize: "14px" }}>{jsonError}</p>}
      <button onClick={handleGenerateTree} style={panelStyles.buttonPrimary}>
        Generate Tree
      </button>
      <button onClick={handleClear} style={panelStyles.buttonClear}>Clear</button>

      {/*Search section */}
      <div style={{ marginTop: "10px", borderTop: "1px solid #eee", paddingTop: "10px" }}>
        <input
          type="text"
          value={searchPath}
          onChange={(e) => setSearchPath(e.target.value)}
          placeholder="Enter JSON path e.g. $.user.address.city"
          style={panelStyles.input}
        />
        <button onClick={handleSearch} style={panelStyles.buttonSearch}>
          Search
        </button>
        {searchMessage && (
          <p
            style={{
              fontSize: "14px",
              color: searchMessage.includes("✅") ? "green" : "red",
            }}
          >
            {searchMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default JsonInputPanel;
