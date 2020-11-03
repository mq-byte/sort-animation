import React from 'react';
import BubbleSort from "./components/BubbleSort";
import SelectSort from "./components/SelectSort";
import InsertionSort from "./components/InsertionSort";

function App() {
  return (
    <div
        style={{
            width:1000,
            margin: '0 auto'
        }}
    >
        <BubbleSort />
        <SelectSort />
        <InsertionSort />
    </div>
  );
}

export default App;
