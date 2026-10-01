export default function turnToDOM(string) {
  return new DOMParser().parseFromString(string, "text/xml").firstChild;
}
