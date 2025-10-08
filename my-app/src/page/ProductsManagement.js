import { useProducts } from '../Context/ProductsContext.js';
import ProductsList from '../Components/ProductsList.js';
import ProductsEditForm from '../Components/ProductsEditForm.js';
import ProductsShow from '../Components/ProductsShow.js';

export default function ProductsManagement() {
  const data = useProducts();
  return (
    <>
      <h1>Quản lý sản phẩm</h1>
      {(() => {
        switch (data.view) {
          case 'index' :
            return <ProductsList />;
          case 'edit':
            return <ProductsEditForm />;
          case 'create':
            return <ProductsEditForm />;
          case 'show':
            return <ProductsShow/>;
          default:
            return <h2>Error: Unknown view</h2>;
        }
      })()}
    </>
  );
}
