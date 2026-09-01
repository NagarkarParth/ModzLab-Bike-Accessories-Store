import { useState } from "react";
import AdminProductCard from "../components/AdminProductCard";
import "../admin.css";

function AdminDashboard() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "MT-15 Exhaust",
      price: 4999,
      category: "Exhaust",
      stock: 10,
      image: "https://via.placeholder.com/300x200?text=MT-15+Exhaust",
    },
    {
      id: 2,
      name: "LED Fog Light",
      price: 1499,
      category: "Fog Lights",
      stock: 5,
      image: "https://via.placeholder.com/300x200?text=LED+Fog+Light",
    },
    {
      id: 3,
      name: "Riding Helmet",
      price: 2999,
      category: "Helmet",
      stock: 0,
      image: "https://via.placeholder.com/300x200?text=Helmet",
    },
  ]);

  // ================= DELETE PRODUCT =================

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    setProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== id)
    );
  };

  // ================= TOGGLE STOCK =================

  const handleToggleStock = (id) => {
    setProducts((currentProducts) =>
      currentProducts.map((product) => {
        if (product.id === id) {
          return {
            ...product,
            stock: product.stock > 0 ? 0 : 10,
          };
        }

        return product;
      })
    );
  };

  return (
    <div className="admin-dashboard">

      {/* Header */}
      <div className="admin-header">
        <div>
          <h1>ModzLab Admin</h1>
          <p>Product Management</p>
        </div>
      </div>

      {/* Dashboard Stats */}
      <div className="admin-stats">

        <div className="admin-stat-card">
          <h3>Total Products</h3>
          <p>{products.length}</p>
        </div>

        <div className="admin-stat-card">
          <h3>In Stock</h3>
          <p>
            {products.filter((product) => product.stock > 0).length}
          </p>
        </div>

        <div className="admin-stat-card">
          <h3>Out of Stock</h3>
          <p>
            {products.filter((product) => product.stock === 0).length}
          </p>
        </div>

      </div>

      {/* Products Section */}
      <div className="admin-products-section">

        <div className="admin-section-header">
          <h2>Products</h2>

          <button className="add-product-btn">
            + Add Product
          </button>
        </div>

        {/* Product List */}
        <div className="admin-products-grid">

          {products.map((product) => (
            <AdminProductCard
              key={product.id}
              product={product}
              onDelete={handleDelete}
              onToggleStock={handleToggleStock}
            />
          ))}

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;