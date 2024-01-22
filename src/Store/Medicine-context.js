import React from 'react';

const MedicineContext = React.createContext({
  items: [],
  addItem: (items) => { },
  removeItem: (id) => { }
});

export default MedicineContext;