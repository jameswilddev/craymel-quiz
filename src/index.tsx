/* istanbul ignore file */
import "./index.sass";

import * as reactDom from "react-dom";
import * as React from "react";

import { Root } from "./root";

if (`serviceWorker` in navigator) {
  navigator.serviceWorker.register(`service-worker.js`);
}

reactDom.render(<Root />, document.getElementById(`root`));
