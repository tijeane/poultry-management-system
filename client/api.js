const API_BASE = 'http://localhost:5000/api';

export default {
  // Lots Management
  getLots: async () => {
    const response = await fetch(`${API_BASE}/lots`);
    return await response.json();
  },
  
  addLot: async (lotData) => {
    const response = await fetch(`${API_BASE}/lots`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lotData)
    });
    return await response.json();
  },

  // Production Tracking
  getProduction: async () => {
    const response = await fetch(`${API_BASE}/production`);
    return await response.json();
  },
  
  addProduction: async (prodData) => {
    const response = await fetch(`${API_BASE}/production`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(prodData)
    });
    return await response.json();
  },

  // Financial Data
  getSales: async () => {
    const response = await fetch(`${API_BASE}/sales`);
    return await response.json();
  },
  
  addSale: async (saleData) => {
    const response = await fetch(`${API_BASE}/sales`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(saleData)
    });
    return await response.json();
  }
};