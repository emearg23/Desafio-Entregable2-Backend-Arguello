const fs = require('fs');

class ProductManager {
  constructor(dataFile) {
    this.dataFile = dataFile;
    this.path = dataFile;
    this.products = this.loadProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.dataFile, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  saveProducts() {
    const data = JSON.stringify(this.products, null, 2);
    fs.writeFileSync(this.dataFile, data);
  }

  generateUniqueId() {
    if (this.products.length === 0) {
      return 1;
    }
    const maxId = Math.max(...this.products.map(product => product.id));
    return maxId + 1;
  }

  addProduct(product) {
    const id = this.generateUniqueId();
    product.id = id;
    this.products.push(product);
    this.saveProducts();
    return product;
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find(product => product.id === id);
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    return product;
  }

  updateProduct(id, updatedProduct) {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      updatedProduct.id = id;
      this.products[index] = updatedProduct;
      this.saveProducts();
      return updatedProduct;
    }
    throw new Error('Producto no encontrado para actualizar');
  }

  deleteProduct(id) {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      this.saveProducts();
      return true;
    }
    throw new Error('Producto no encontrado para eliminar');
  }
}

const productManager = new ProductManager('products.json');

const newProduct = {
  title: "producto prueba",
  description: "Este es un producto prueba",
  price: 200,
  thumbnail: "Sin imagen",
  code: "abc123",
  stock: 25,
};

const newProduct2 = {
    title: "producto prueba 2",
    description: "Este es un producto prueba 2",
    price: 150,
    thumbnail: "Sin imagen 2",
    code: "abc123",
    stock: 20,
};

productManager.addProduct(newProduct);
productManager.addProduct(newProduct2);

console.log(productManager.getProducts());

const updatedProduct = {
  title: "Producto Modificado",
  description: "Descripción modificada",
  price: 300,
  thumbnail: "Nueva imagen",
  code: "abc123",
  stock: 10,
};

console.log(productManager.updateProduct(1, updatedProduct));

console.log(productManager.deleteProduct(1));