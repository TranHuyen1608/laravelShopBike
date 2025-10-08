import { useProducts, useProductsDispatch } from "../Context/ProductsContext.js";
import { useState } from "react";
export default function ProductFix() {
  const data = useProducts();  
  const dispatch = useProductsDispatch();
  
    const product = data.products.find((p) => p.id === data.id);
  
  
  const [form, setForm] = useState({
    id: product?.id|| 0,
    name: product?.name || "",
    price: product?.price || 0,
    desc: product?.desc || "",
  });

  const [errors, setErrors] = useState({});
  function validate() {
    const newErrors = {};
  
    // name: không rỗng, không toàn khoảng trắng
    if (!form.name.trim()) {
      newErrors.name = "Tên sản phẩm bắt buộc nhập";
    } else {
      // kiểm tra trùng tên (case-insensitive)
      const exists = data.products.some(
        (p) =>
          p.id !== form.id && // bỏ qua chính sản phẩm đang sửa
          p.name.toLowerCase() === form.name.trim().toLowerCase()
      );
  
      if (exists) {
        newErrors.name = "Tên sản phẩm đã tồn tại";
      }
    }
  
    // price: không rỗng, phải là số nguyên
    if (form.price === "" || form.price === null) {
      newErrors.price = "Giá sản phẩm bắt buộc nhập";
    } else if (!Number.isInteger(Number(form.price))) {
      newErrors.price = "Giá sản phẩm phải là số nguyên";
    // } else if (Number.isInteger(Number(form.price)) > 0)
    // {
    //     newErrors.price = "Giá sản phẩm phải > 0";
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }
  

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    if (data.view === "edit") {
      dispatch({
        type: "update",
        product: {
          ...form,
          price: Number(form.price), // ép giá trị về số
        },
      });
      // Sau khi lưu xong thì quay lại danh sách
      dispatch({ type: "index" });
    } else {
      dispatch({
        type: "store",
        product: {
          ...form,
          price: Number(form.price), // ép giá trị về số
        },
      });
      //Bên store đã tự trả về index
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        border: "1px solid #ccc",
        padding: "16px",
        borderRadius: "8px",
        maxWidth: "400px",
      }}
    >
      {data.view === "edit" ? (
        <>
          <h2>Sửa sản phẩm</h2>
          <div>
            <label>ID:</label>
            <input type="text" value={form.id} readOnly />
          </div>
          <div>
            <label>Tên sản phẩm:</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
          </div>

          <div>
            <label>Giá:</label>
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
            {errors.price && <p style={{ color: "red" }}>{errors.price}</p>}
          </div>

          <div>
            <label>Mô tả:</label>
            <textarea
              value={form.desc}
              onChange={(e) => setForm({ ...form, desc: e.target.value })}
            />
          </div>

          <button type="submit">Lưu</button>
          <button
            type="button"
            onClick={() => {
              dispatch({ type: "index" });
            }}
          >
            Hủy
          </button>
        </>
      ) : (
        <>
          <h2>Thêm sản phẩm</h2>
          <div>
            <label>Tên sản phẩm:</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
          </div>

          <div>
            <label>Giá:</label>
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
            {errors.price && <p style={{ color: "red" }}>{errors.price}</p>}
          </div>

          <div>
            <label>Mô tả:</label>
            <textarea
              value={form.desc}
              onChange={(e) => setForm({ ...form, desc: e.target.value })}
            />
          </div>

          <button type="submit">Thêm</button>
          <button
            type="button"
            onClick={() => {
              dispatch({ type: "index" });
            }}
          >
            Hủy
          </button>
        </>
      )}
    </form>
  );
}
