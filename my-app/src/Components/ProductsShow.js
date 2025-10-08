import { useProducts, useProductsDispatch } from "../Context/ProductsContext.js";

export default function ProductsShow()
{
    const data = useProducts();
    const  dispatch = useProductsDispatch();
    const productID = data.products.find(p=> p.id === data.id);
    return(
        <div>
            { productID ?(
                <div style={{border:"1px solid #ccc", padding:"16px", borderRadius:"8px", maxWidth:"300px"}}>
                <h2>Chi tiết sản phẩm</h2>
                <p><strong>ID:</strong> {productID.id}</p>
                <p><strong>Tên:</strong> {productID.name}</p>
                <p><strong>Giá:</strong> {productID.price} VND</p>
                <p><strong>Mô tả:</strong> {productID.desc}</p>
                <button onClick={() => dispatch({type:"index"})}>Quay Lại</button>
            </div>
            
            ):(
                <p>Không tìm thấy sản phẩm</p>
            )}
        </div>
    );
}