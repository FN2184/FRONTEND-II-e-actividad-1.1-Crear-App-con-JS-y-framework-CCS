import React, { useState, useEffect } from 'react';

function App() {
  // Estado inicial: obtenemos los productos guardados en LocalStorage o inicializamos un array vacío
  const [productos, setProductos] = useState(() => {
    try {
      const savedProductos = localStorage.getItem('productos');
      return savedProductos ? JSON.parse(savedProductos) : [];
    } catch (error) {
      console.error('Error accediendo a LocalStorage:', error);
      return [];
    }
  });

  // Variables de estado para los campos del formulario
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [busqueda, setBusqueda] = useState(''); // Campo de búsqueda
  const [alerta, setAlerta] = useState(null); // Estado para mostrar mensajes de éxito o error
  const [modoEdicion, setModoEdicion] = useState(false); // Indicador de si estamos en modo de edición
  const [productoIdEdicion, setProductoIdEdicion] = useState(null); // Almacena el ID del producto que se está editando

  // useEffect: guarda los productos en LocalStorage cada vez que la lista de productos cambia
  useEffect(() => {
    try {
      localStorage.setItem('productos', JSON.stringify(productos));
    } catch (error) {
      console.error('Error guardando en LocalStorage:', error);
    }
  }, [productos]);

  // Función para agregar un nuevo producto o actualizar uno existente
  const agregarProducto = (e) => {
    e.preventDefault();
    // Validamos que todos los campos del formulario estén llenos
    if (nombre && descripcion && precio && cantidad) {
      if (modoEdicion) {
        // Si estamos en modo edición, actualizamos el producto existente
        const productosActualizados = productos.map((producto) =>
          producto.id === productoIdEdicion
            ? { id: productoIdEdicion, nombre, descripcion, precio, cantidad }
            : producto
        );
        setProductos(productosActualizados);
        setModoEdicion(false); // Salimos del modo edición
        setAlerta({ tipo: 'success', mensaje: 'Producto actualizado correctamente' });
      } else {
        // Si no estamos editando, agregamos un nuevo producto
        const nuevoProducto = {
          id: Date.now(), // Usamos la marca de tiempo como ID único
          nombre,
          descripcion,
          precio,
          cantidad,
        };
        setProductos([...productos, nuevoProducto]);
        setAlerta({ tipo: 'success', mensaje: 'Producto agregado correctamente' });
      }

      // Limpiamos los campos del formulario después de agregar o actualizar el producto
      setNombre('');
      setDescripcion('');
      setPrecio('');
      setCantidad('');
      setProductoIdEdicion(null); // Limpiamos el ID del producto que se estaba editando
    } else {
      // Si hay algún campo vacío, mostramos un mensaje de error
      setAlerta({ tipo: 'error', mensaje: 'Todos los campos son obligatorios' });
    }

    // Ocultamos la alerta después de 3 segundos
    setTimeout(() => setAlerta(null), 3000);
  };

  // Función para eliminar un producto de la lista
  const eliminarProducto = (id) => {
    const nuevosProductos = productos.filter((producto) => producto.id !== id);
    setProductos(nuevosProductos);
    setAlerta({ tipo: 'success', mensaje: 'Producto eliminado correctamente' });
    setTimeout(() => setAlerta(null), 3000); // Ocultamos la alerta después de 3 segundos
  };

  // Función para editar un producto existente
  const editarProducto = (producto) => {
    setModoEdicion(true); // Activamos el modo edición
    setProductoIdEdicion(producto.id); // Guardamos el ID del producto que se está editando
    // Rellenamos los campos del formulario con los valores del producto que vamos a editar
    setNombre(producto.nombre);
    setDescripcion(producto.descripcion);
    setPrecio(producto.precio);
    setCantidad(producto.cantidad);
  };

  // Filtramos los productos según el término de búsqueda
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
            {modoEdicion ? 'Actualizar Producto' : 'Agregar Producto'} {/* Cambiamos el texto del botón según el modo */}
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
                      onClick={() => editarProducto(producto)} // Botón para editar el producto
                      className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition duration-200"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => eliminarProducto(producto.id)} // Botón para eliminar el producto
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-200 ml-2"
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
