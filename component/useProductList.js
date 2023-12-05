import { useEffect, useState } from 'react';

const useProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const fetchProducts = async (skip) => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://dummyjson.com/products?limit=10&skip=${skip}`,
      );
      const data = await res.json();
      setProducts((prevProducts) => [...prevProducts, ...(data?.products || [])]);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
      setIsFetchingMore(false);
    }
  };

  const loadMore = () => {
    if (!isFetchingMore) {
      setIsFetchingMore(true);
      fetchProducts(products.length); // Pass the current length as skip
    }
  };

  useEffect(() => {
    fetchProducts(0); // Initial load with skip = 0
  }, []);

  return { products, loading, loadMore, isFetchingMore };
};

export default useProductList;
