class Node {
    constructor(symbol, frequency, left = null, right = null) {
      this.symbol = symbol;
      this.frequency = frequency;
      this.left = left;
      this.right = right;
    }
  }
  
  function buildShannonFanoTree(text) {
    const frequencyMap = new Map();
  
    for (const char of text) {
      frequencyMap.set(char, (frequencyMap.get(char) || 0) + 1);
    }
  
    const nodes = Array.from(frequencyMap, ([symbol, frequency]) => new Node(symbol, frequency));
  
    function buildTree(nodes) {
      if (nodes.length === 1) {
        return nodes[0];
      }
  
      nodes.sort((a, b) => a.frequency - b.frequency);
  
      const mid = Math.ceil(nodes.length / 2);
      const left = nodes.slice(0, mid);
      const right = nodes.slice(mid);
  
      return new Node(null, left.reduce((sum, node) => sum + node.frequency, 0) + right.reduce((sum, node) => sum + node.frequency, 0), buildTree(left), buildTree(right));
    }
  
    const root = buildTree(nodes);
  
    return root;
  }
  
  function generateCodes(root, code = '', codes = {}) {
    if (root.symbol !== null) {
      codes[root.symbol] = code;
      return codes;
    }
  
    generateCodes(root.left, code + '0', codes);
    generateCodes(root.right, code + '1', codes);
  
    return codes;
  }
  
  const inputText = "Hello, World! 123";
  const frequencyMap = new Map(Array.from(inputText, char => [char, 0])); // Initialize frequencies to 0
  for (const char of inputText) {
    frequencyMap.set(char, frequencyMap.get(char) + 1);
  }
  
  const root = buildShannonFanoTree(inputText);
  const codes = generateCodes(root);
  
  console.log("Symbol\tASCII\tFrequency\tCode");
  for (const [symbol, frequency] of frequencyMap) {
    const asciiValue = symbol.charCodeAt(0);
    console.log(`${symbol}\t${asciiValue}\t${frequency}\t\t${codes[symbol]}`);
  }
  