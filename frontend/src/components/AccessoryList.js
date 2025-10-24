import React, { useEffect, useState } from "react";

function AccessoryList() {
  const [accessories, setAccessories] = useState([]);
  const [newAccessory, setNewAccessory] = useState({
    name: "",
    type: "",
    price: "",
    stock: "",
    image: ""
  });
  const [editingId, setEditingId] = useState(null);


  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/accessories")
      .then((res) => res.json())
      .then((data) => setAccessories(data))
      .catch((err) => console.error(err));
  }, []);


  const handleAddAccessory = () => {
    fetch("http://127.0.0.1:5000/api/accessories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAccessory)
    })
      .then(() => window.location.reload())
      .catch((err) => console.error(err));
  };


  const handleDeleteAccessory = (id) => {
    if (window.confirm("Xóa phụ kiện này?")) {
      fetch(`http://127.0.0.1:5000/api/accessories/${id}`, {
        method: "DELETE"
      })
        .then(() => window.location.reload())
        .catch((err) => console.error(err));
    }
  };

  
  const handleEditAccessory = (acc) => {
    setEditingId(acc._id);
    setNewAccessory(acc);
  };

  const handleUpdateAccessory = () => {
    fetch(`http://127.0.0.1:5000/api/accessories/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAccessory)
    })
      .then(() => {
        alert("Cập nhật thành công!");
        window.location.reload();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2 style={{ textAlign: "center" }}>🪸 Danh sách phụ kiện hồ cá</h2>

      
      <div
        style={{
          backgroundColor: "#f7f9fa",
          padding: "15px",
          borderRadius: "8px",
          marginBottom: "20px"
        }}
      >
        <input
          placeholder="Tên phụ kiện"
          value={newAccessory.name}
          onChange={(e) => setNewAccessory({ ...newAccessory, name: e.target.value })}
        />
        <input
          placeholder="Loại"
          value={newAccessory.type}
          onChange={(e) => setNewAccessory({ ...newAccessory, type: e.target.value })}
        />
        <input
          placeholder="Giá"
          type="number"
          value={newAccessory.price}
          onChange={(e) => setNewAccessory({ ...newAccessory, price: e.target.value })}
        />
        <input
          placeholder="Số lượng"
          type="number"
          value={newAccessory.stock}
          onChange={(e) => setNewAccessory({ ...newAccessory, stock: e.target.value })}
        />
        <input
          placeholder="URL ảnh"
          value={newAccessory.image}
          onChange={(e) => setNewAccessory({ ...newAccessory, image: e.target.value })}
        />

        {editingId ? (
          <button onClick={handleUpdateAccessory}>💾 Cập nhật</button>
        ) : (
          <button onClick={handleAddAccessory}>➕ Thêm</button>
        )}
      </div>

      
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px"
        }}
      >
        {accessories.map((acc) => (
          <div
            key={acc._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "10px",
              textAlign: "center",
              backgroundColor: "#fff"
            }}
          >
            <img
              src={acc.image}
              alt={acc.name}
              width="150"
              height="100"
              style={{ borderRadius: "8px", objectFit: "cover" }}
            />
            <h3>{acc.name}</h3>
            <p>Loại: {acc.type}</p>
            <p>Giá: {acc.price} VND</p>
            <p>Số lượng: {acc.stock}</p>
            <button onClick={() => handleEditAccessory(acc)}>✏️ Sửa</button>
            <button
              onClick={() => handleDeleteAccessory(acc._id)}
              style={{ marginLeft: "5px", color: "red" }}
            >
              🗑️ Xóa
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AccessoryList;
