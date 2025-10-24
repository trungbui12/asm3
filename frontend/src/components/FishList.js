import React, { useEffect, useState } from "react";

function FishList() {
  const [fishList, setFishList] = useState([]);
  const [newFish, setNewFish] = useState({
    name: "",
    category: "",
    price: "",
    size: "",
    stock: "",
    description: ""
  });

  
  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/fish")
      .then((res) => res.json())
      .then((data) => setFishList(data))
      .catch((err) => console.error(err));
  }, []);

 
  const handleAddFish = () => {
    fetch("http://127.0.0.1:5000/api/fish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newFish)
    })
      .then(() => {
        alert("Thêm cá thành công!");
        window.location.reload();
      })
      .catch((err) => console.error(err));
  };

  
  const handleDeleteFish = (id) => {
    if (window.confirm("Xóa con cá này?")) {
      fetch(`http://127.0.0.1:5000/api/fish/${id}`, { method: "DELETE" })
        .then(() => {
          alert("Đã xóa!");
          window.location.reload();
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🐠 Danh sách cá cảnh</h2>

      
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Tên cá"
          onChange={(e) => setNewFish({ ...newFish, name: e.target.value })}
        />
        <input
          placeholder="Loại cá"
          onChange={(e) => setNewFish({ ...newFish, category: e.target.value })}
        />
        <input
          placeholder="Giá"
          type="number"
          onChange={(e) => setNewFish({ ...newFish, price: e.target.value })}
        />
        <input
          placeholder="Kích thước"
          onChange={(e) => setNewFish({ ...newFish, size: e.target.value })}
        />
        <input
          placeholder="Số lượng"
          type="number"
          onChange={(e) => setNewFish({ ...newFish, stock: e.target.value })}
        />
        <input
          placeholder="Mô tả"
          onChange={(e) =>
            setNewFish({ ...newFish, description: e.target.value })
          }
        />
        <button onClick={handleAddFish}>Thêm cá</button>
      </div>

     
      <table border="1" cellPadding="10" style={{ width: "100%" }}>
        <thead>
          <tr style={{ backgroundColor: "#e0f7fa" }}>
            <th>Tên cá</th>
            <th>Loại</th>
            <th>Giá</th>
            <th>Kích thước</th>
            <th>Số lượng</th>
            <th>Mô tả</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {fishList.map((fish) => (
            <tr key={fish._id}>
              <td>{fish.name}</td>
              <td>{fish.category}</td>
              <td>{fish.price}</td>
              <td>{fish.size}</td>
              <td>{fish.stock}</td>
              <td>{fish.description}</td>
              <td>
                <button onClick={() => handleDeleteFish(fish._id)}>❌ Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FishList;
