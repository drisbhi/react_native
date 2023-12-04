import { useEffect, useState } from 'react';

const useProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [skip, setSkip] = useState(0);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`https://dummyjson.com/products?skip=${skip}`);
      const data = await res.json();
      setProducts((prevProducts) => [...prevProducts, ...data?.products]);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    setSkip((prevSkip) => prevSkip + 5); 
  };

  useEffect(() => {
    fetchProducts();
  }, [skip]);

  return { products, loading, loadMore };
};

export default useProductList;
