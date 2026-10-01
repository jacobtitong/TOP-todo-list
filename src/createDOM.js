import { default as turnToDOM } from "./turnToDOM.js";

export default function createDOM(type, attributes, ...children) {
  let element;
  if (type[0] === "<" && type.lastIndexOf(">")) {
    element = turnToDOM(type);
  } else {
    element = document.createElement(type);
  }

  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }

  children.forEach((child) => {
    if (typeof child === "string") {
      element.appendChild(document.createTextNode(child));
    } else {
      element.appendChild(child);
    }
  });

  return element;
}
