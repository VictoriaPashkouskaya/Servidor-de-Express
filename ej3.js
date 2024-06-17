const express = require('express');
const app = express();
const puerto = 3000;

app.use(express.json());

let productos = [
  { id: 1, nombre: 'Taza de Harry Potter', precio: 300 },
  { id: 2, nombre: 'FIFA 22 PS5', precio: 1000 },
  { id: 3, nombre: 'Figura Goku Super Saiyan', precio: 100 },
  { id: 4, nombre: 'Zelda Breath of the Wild', precio: 200 },
  { id: 5, nombre: 'Skin Valorant', precio: 120 },
  { id: 6, nombre: 'Taza de Star Wars', precio: 220 }
];

// Ruta para obtener la lista de productos
app.get('/products', (req, res) => {
  res.json({
    description: 'Productos',
    items: productos
  });
});

// Ruta для crear un nuevo producto
app.post('/products', (req, res) => {
  const nuevoProducto = req.body;
  productos.push(nuevoProducto);
  res.status(201).send('Producto creado');
});

// Ruta для actualizar un producto existente
app.put('/products/:id', (req, res) => {
  const { id } = req.params;
  const productoActualizado = req.body;
  productos = productos.map(producto =>
    producto.id == id ? { ...producto, ...productoActualizado } : producto
  );
  res.send('Producto actualizado');
});

// Ruta для eliminar un producto
app.delete('/products/:id', (req, res) => {
  const { id } = req.params;
  productos = productos.filter(producto => producto.id != id);
  res.send('Producto eliminado');
});

// Ruta для filtrar productos по цене exacto
app.get('/products/precio/:precio', (req, res) => {
  const { precio } = req.params;
  const productosFiltrados = productos.filter(producto => producto.precio == precio);
  res.json(productosFiltrados);
});

// Ruta для filtrar productos по диапазону цен
app.get('/products/precio/rango/:min/:max', (req, res) => {
  const { min, max } = req.params;
  const productosFiltrados = productos.filter(producto => producto.precio >= min && producto.precio <= max);
  res.json(productosFiltrados);
});

// Ruta для obtener un producto по id
app.get('/products/id/:id', (req, res) => {
  const { id } = req.params;
  const producto = productos.find(producto => producto.id == id);
  res.json(producto);
});

// Ruta для obtener un producto по nombre
app.get('/products/nombre/:nombre', (req, res) => {
  const { nombre } = req.params;
  const producto = productos.find(producto => producto.nombre.toLowerCase() === nombre.toLowerCase());
  res.json(producto);
});

app.listen(puerto, () => {
  console.log(`Servidor levantado en el puerto ${puerto}`);
});

