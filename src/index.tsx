import React from 'react';
import ReactDOM from 'react-dom/client';
import "./main.css";
import Tac from "./Tac";
const ref = React.createRef<Tac>();
ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Tac ref={ref} />
    </React.StrictMode>
);
(window as any).tac = ref;