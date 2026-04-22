import axios from 'axios';
import Header from '../../components/Header';
import './HomePage.css';
import { useEffect, useState } from 'react';
import ProductsGrid from './ProductsGrid';

interface HomePageProps {
  cart: any[];
  loadCart: () => void
}

function HomePage({ cart, loadCart }: HomePageProps) {
  const [products, setProducts] = useState<any[]>([]);

  useEffect( () => {
    const getHomeData = async () => {
      const response = await axios.get('/api/products');
      setProducts(response.data);
    };

    getHomeData();
  }, []);

  return (
    <>
      <title>Ecommerce Project</title>

      <Header cart={cart}/>

      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart}/>
      </div>
    </>
  );
}
export default HomePage;