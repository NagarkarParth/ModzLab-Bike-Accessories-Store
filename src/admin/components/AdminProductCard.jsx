import { Trash2, Edit, PackageCheck } from "lucide-react";

function AdminProductCard({
  product,
  onDelete,
  onToggleStock,
}) {
  return (
    <div className="admin-product-card">

      {/* Product Image */}
      <img
        src={product.image}
        alt={product.name}
        className="admin-product-image"
      />

      {/* Product Information */}
      <div className="admin-product-info">

        <h3>{product.name}</h3>

        <p className="admin-product-category">
          {product.category}
        </p>

        <p className="admin-product-price">
          ₹{product.price}
        </p>

        <p className="admin-product-stock">
          Stock: {product.stock}
        </p>

        {/* Stock Status */}
        <span
          className={
            product.stock > 0
              ? "stock-status in-stock"
              : "stock-status out-of-stock"
          }
        >
          {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </span>

        {/* Buttons */}
        <div className="admin-product-actions">

          <button
            className="admin-stock-btn"
            onClick={() => onToggleStock(product.id)}
          >
            <PackageCheck size={18} />

            {product.stock > 0
              ? "Mark Out of Stock"
              : "Mark In Stock"}
          </button>

          <button
            className="admin-edit-btn"
            onClick={() => alert("Edit feature coming soon")}
          >
            <Edit size={18} />
            Edit
          </button>

          <button
            className="admin-delete-btn"
            onClick={() => onDelete(product.id)}
          >
            <Trash2 size={18} />
            Delete
          </button>

        </div>

      </div>
    </div>
  );
}

export default AdminProductCard;