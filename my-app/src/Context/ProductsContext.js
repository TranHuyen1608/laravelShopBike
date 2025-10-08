import { createContext, useContext, useReducer } from 'react';

const  ProductsContext = createContext(null);
const ProductsDispatchContext = createContext(null);

// 1.Trạng thái ban đầu
const initial = {
    newProduct:{id: 0 , name:'',price:0,desc:''}, // giá trị mặc định
    products:[
        {id: 1,name:"sản phẩm 1", price:1000,desc:"Mô tả sản phẩm 1"},
        {id: 2,name:"sản phẩm 2", price:2000,desc:"Mô tả sản phẩm 2"},
        {id: 3,name:"sản phẩm 3", price:3000,desc:"Mô tả sản phẩm 3"},
        {id: 4,name:"sản phẩm 4", price:4000,desc:"Mô tả sản phẩm 4"},
        {id: 5,name:"sản phẩm 5", price:5000,desc:"Mô tả sản phẩm 5"},
        
    ], view:'index', // thao tác hiện tại
    id:null, // mã sản phẩm hiện tại cho các thao tác xóa sửa xem chi tiết
};
// 2. recducer (các hàm thay đổi trạng thái)
function productsReducer(data,{type,id = null,product = null})
{
    //console.log('Reducer',type,id,product)
    switch(type)
    {
        case 'index':{
            return {
                ...data,
                view:'index',
                id:null
            }
        }
        case 'show':{ 
            return {
                ...data, 
                view:"show",
                id: id
            } 
        
        }

        case 'create':{
            return {
                ...data,
                view:"create",
                id:null
            }
        }

        case 'store':{
            // fake code, sau này khi kết DB thì DB tự tăng ID
            const maxId = Math.max(0,...data.products.map(p=>p.id));
            product.id = maxId + 1;
            return {
                ...data,
                products:[...data.products,product],
                view:'index',
                id:null,
            }
        }
        case 'edit' :{
            return  {
                ...data,
                view:"edit",
                id:id
            }
        }
        case 'update':{
            return {
                ...data,
                products: data.products.map(p =>
                    p.id === product.id ? product : p
                  )
            }

        }
        case 'destroy':{
            return {
                ...data,
                products: data.products.filter(p=> p.id !== id)
            }
        }
        default:{
            throw Error('Unknown action: '+type);
        }
    }
    
}

//3.Provider (tạo các context provider để chia sẻ trạng thái
// và các hàm dispatch cho các component con)

export function ProductsProvider({children})
{
    const [data,dispatch] = useReducer(
        productsReducer,
        initial
    );
    return (
        <ProductsContext.Provider value={data}>
            <ProductsDispatchContext.Provider value={dispatch}>
                {children}
            </ProductsDispatchContext.Provider>
        </ProductsContext.Provider>
    );
}

// 4.Custom hooks để sử dụng các context
//component nào sử dụng trạng thái thì gọi useProducts

export function useProducts(){
    return useContext(ProductsContext);
}

//component nào cần gọi các hàm thay đổi trạng thái thì gọi useProductsDispatch
export function useProductsDispatch(){
    return useContext(ProductsDispatchContext);
}

