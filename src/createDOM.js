export default function createDOM(DOMDetails) {
  if (DOMDetails.hasOwnProperty("element")) {
    const { element } = DOMDetails;
    const DOMElement = document.createElement(element);

    breakMe: if (DOMDetails.hasOwnProperty("classList")) {
      const { classList } = DOMDetails;
      if (typeof classList !== typeof []) {
        DOMElement.classList.add(classList);
        break breakMe;
      }
      classList.forEach((name) => {
        DOMElement.classList.add(name);
      });
    }

    if (DOMDetails.hasOwnProperty("textContent")) {
      const { textContent } = DOMDetails;
      DOMElement.textContent = textContent;
    }

    return DOMElement;
  }
  return;
}
