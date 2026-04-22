import Product from './Product'

interface ProductsGridProps {
  products: any[]
  loadCart: () => void
}

function ProductsGrid({ products, loadCart }: ProductsGridProps) {
  return (
    <div className="products-grid">
      {products.map((product) => {
        return (
          <Product key={product.id} product={product} loadCart={loadCart} />
        );
      })}
    </div>
  );
}
export default ProductsGrid