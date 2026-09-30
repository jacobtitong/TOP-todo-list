export default function createDOM(string) {
  return new DOMParser().parseFromString(string, "text/xml").firstChild;
}
