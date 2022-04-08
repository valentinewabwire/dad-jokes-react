import React from "react";
import styles from "./App.styles";
import JokeLists from "./components/JokeLists";

export default function App() {
  return (
    <div style={styles.app}>
      <JokeLists />
    </div>
  );
}
