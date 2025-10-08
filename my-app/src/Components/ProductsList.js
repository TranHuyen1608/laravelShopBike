import { useProducts, useProductsDispatch } from "../Context/ProductsContext.js";

export default function ProductsList() {
  const data = useProducts(); // lấy state
  const dispatch = useProductsDispatch(); // lấy hàm dispatch

  return (
    <div>
      <h2>Danh sách sản phẩm</h2>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Mã</th>
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th>Mô tả</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {data.products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>{p.desc}</td>
              <td>
                <button onClick={() => dispatch({ type: "show", id: p.id })}>
                  Xem
                </button>
                <button onClick={() => dispatch({ type: "edit", id: p.id })}>
                  Sửa
                </button>
                <button onClick={() => dispatch({ type: "destroy", id: p.id })}>
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={() => dispatch({ type: "create" })}>
        Thêm sản phẩm
      </button>
    </div>
  );
}
