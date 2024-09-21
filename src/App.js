import React, { useState, useEffect } from 'react';

function App() {
  const [productos, setProductos] = useState(() => {
    try {
      const savedProductos = localStorage.getItem('productos');
      return savedProductos ? JSON.parse(savedProductos) : [];
    } catch (error) {
      console.error('Error accediendo a LocalStorage:', error);
      return [];
    }
  });
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [alerta, setAlerta] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('productos', JSON.stringify(productos));
    } catch (error) {
      console.error('Error guardando en LocalStorage:', error);
    }
  }, [productos]);

  const agregarProducto = (e) => {
    e.preventDefault();
    if (nombre && descripcion && precio && cantidad) {
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
      setAlerta({ tipo: 'success', mensaje: 'Producto agregado correctamente' });
    } else {
      setAlerta({ tipo: 'error', mensaje: 'Todos los campos son obligatorios' });
    }

    setTimeout(() => setAlerta(null), 3000);
  };

  // Nueva función para eliminar productos
  const eliminarProducto = (id) => {
    const nuevosProductos = productos.filter((producto) => producto.id !== id);
    setProductos(nuevosProductos);
    setAlerta({ tipo: 'success', mensaje: 'Producto eliminado correctamente' });
    setTimeout(() => setAlerta(null), 3000);
  };

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

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

      {alerta && (
        <div
          className={`mb-4 p-2 rounded ${
            alerta.tipo === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white`}
        >
          {alerta.mensaje}
        </div>
      )}

      <input
        type="text"
        placeholder="Buscar producto"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="mb-4 w-full p-2 border"
      />

      <div>
        {productosFiltrados.map((producto) => (
          <div key={producto.id} className="mb-4">
            <h3 className="text-lg font-semibold">{producto.nombre}</h3>
            <p>{producto.descripcion}</p>
            <p>Precio: ${producto.precio}</p>
            <p>Cantidad: {producto.cantidad}</p>
            <button
              onClick={() => eliminarProducto(producto.id)}
              className="bg-red-500 text-white p-2 rounded"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
