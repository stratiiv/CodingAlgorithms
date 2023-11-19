class Node {
  constructor(symbol, frequency, left = null, right = null) {
      this.symbol = symbol;
      this.frequency = frequency;
      this.left = left;
      this.right = right;
  }
}

function calculateFrequencies(text) {
  const frequencyMap = new Map();
  for (const char of text) {
      frequencyMap.set(char, (frequencyMap.get(char) || 0) + 1);
  }
  return frequencyMap;
}

function buildHuffmanTree(frequencyMap) {
  const nodes = Array.from(frequencyMap, ([symbol, frequency]) => new Node(symbol, frequency));

  function buildTree(nodes) {
      if (nodes.length === 1) {
          return nodes[0];
      }

      nodes.sort((a, b) => a.frequency - b.frequency);

      const left = nodes.shift();
      const right = nodes.shift();

      const mergedNode = new Node(null, left.frequency + right.frequency, left, right);
      nodes.push(mergedNode);

      return buildTree(nodes);
  }

  return buildTree(nodes);
}

function generateHuffmanCodes(root, code = '', codes = {}) {
  if (root.symbol !== null) {
      codes[root.symbol] = code;
      return codes;
  }

  generateHuffmanCodes(root.left, code + '0', codes);
  generateHuffmanCodes(root.right, code + '1', codes);

  return codes;
}

function calculateEntropy(frequencyMap) {
  const totalFrequency = Array.from(frequencyMap.values()).reduce((total, freq) => total + freq, 0);
  return Array.from(frequencyMap.values()).reduce((entropy, freq) => entropy - (freq / totalFrequency) * Math.log2(freq / totalFrequency), 0);
}

function displayResults(frequencyMap, codes) {
  const outputTableBody = document.getElementById('outputTableBody');
  outputTableBody.innerHTML = '';

  for (const [symbol, frequency] of frequencyMap) {
      const asciiValue = symbol.charCodeAt(0);
      outputTableBody.innerHTML += `
          <tr>
              <td>${symbol}</td>
              <td>${asciiValue}</td>
              <td>${frequency}</td>
              <td>${codes[symbol]}</td>
          </tr>
      `;
  }
}

function processData() {
  const inputData = document.getElementById('inputData').value;
  const frequencyMap = calculateFrequencies(inputData);
  const root = buildHuffmanTree(frequencyMap);
  const codes = generateHuffmanCodes(root);

  displayResults(frequencyMap, codes);

  const binaryRepresentation = document.getElementById('binaryRepresentation');
  binaryRepresentation.textContent = inputData.split('').map(char => codes[char]).join('');

  const entropy = calculateEntropy(frequencyMap);
  const numberOfBits = Object.values(codes).join('').length;
  const averageCodeLength = Array.from(frequencyMap.entries()).reduce((averageLength, [symbol, freq]) => averageLength + (freq / inputData.length) * codes[symbol].length, 0);
  const codeEfficiency = entropy / averageCodeLength;

  document.getElementById('entropy').textContent = entropy.toFixed(4);
  document.getElementById('numberOfBits').textContent = numberOfBits;
  document.getElementById('averageCodeLength').textContent = averageCodeLength.toFixed(4);
  document.getElementById('codeEfficiency').textContent = codeEfficiency.toFixed(4);
}
