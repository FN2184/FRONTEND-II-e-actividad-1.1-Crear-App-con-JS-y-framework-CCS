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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Gestión de Inventario
        </h1>

        <form onSubmit={agregarProducto} className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <input
            type="text"
            placeholder="Nombre del Producto"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Cantidad"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="col-span-2 w-full bg-blue-500 text-white p-3 rounded-md font-semibold hover:bg-blue-600 transition duration-200"
          >
            Agregar Producto
          </button>
        </form>

        {alerta && (
          <div
            className={`mb-6 p-3 text-center rounded-md ${
              alerta.tipo === 'success' ? 'bg-green-500' : 'bg-red-500'
            } text-white`}
          >
            {alerta.mensaje}
          </div>
        )}

        <input
          type="text"
          placeholder="Buscar Producto"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full p-3 mb-6 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {productosFiltrados.length > 0 ? (
          <table className="table-auto w-full text-left bg-white">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Descripción</th>
                <th className="px-4 py-2">Precio</th>
                <th className="px-4 py-2">Cantidad</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productosFiltrados.map((producto) => (
                <tr key={producto.id} className="border-t">
                  <td className="px-4 py-2">{producto.nombre}</td>
                  <td className="px-4 py-2">{producto.descripcion}</td>
                  <td className="px-4 py-2">${producto.precio}</td>
                  <td className="px-4 py-2">{producto.cantidad}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => eliminarProducto(producto.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-200"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500">No hay productos en el inventario.</p>
        )}
      </div>
    </div>
  );
}

export default App;
