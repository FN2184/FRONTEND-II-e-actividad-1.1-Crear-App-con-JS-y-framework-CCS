import React, { useState, useEffect } from 'react';

function App() {
  const [productos, setProductos] = useState(() => {
    const savedProductos = localStorage.getItem('productos');
    return savedProductos ? JSON.parse(savedProductos) : [];
  });
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [cantidad, setCantidad] = useState('');

  useEffect(() => {
    localStorage.setItem('productos', JSON.stringify(productos));
  }, [productos]);

  const agregarProducto = (e) => {
    e.preventDefault();
    const nuevoProducto = {
      id: Date.now(),
      nombre,
      descripcion,
      precio,
      cantidad,
    };
    setProductos([...productos, nuevoProducto]);
    setNombre('');
    setDescripcion('');
    setPrecio('');
    setCantidad('');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Gestión de Inventario</h1>
      <form onSubmit={agregarProducto} className="mb-4">
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="mb-2 w-full p-2 border"
        />
        <input
          type="text"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="mb-2 w-full p-2 border"
        />
        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          className="mb-2 w-full p-2 border"
        />
        <input
          type="number"
          placeholder="Cantidad"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          className="mb-2 w-full p-2 border"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Agregar Producto
        </button>
      </form>
      <div>
        {productos.map((producto) => (
          <div key={producto.id} className="mb-4">
            <h3 className="text-lg font-semibold">{producto.nombre}</h3>
            <p>{producto.descripcion}</p>
            <p>Precio: ${producto.precio}</p>
            <p>Cantidad: {producto.cantidad}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
