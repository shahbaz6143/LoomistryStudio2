// Simulating a backend database
const products = [
  { id: 'rug-101', price: 320, name: 'Ivory Minimal Abstract Wool Rug' },
  { id: 'rug-102', price: 360, name: 'Midnight Blue Geometric Wool Rug' },
  { id: 'rug-103', price: 210, name: 'Terracotta Boho Hand Tufted Runner' },
  { id: 'rug-104', price: 295, name: 'Monochrome Modern Minimal Rug' },
];

module.exports = {
  getProductById: (id) => products.find(p => p.id === id)
};
