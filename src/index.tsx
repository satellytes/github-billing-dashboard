import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./App";
import "./assets/fonts/Coco-Gothic-Regular-TTF.ttf";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(<App />);
