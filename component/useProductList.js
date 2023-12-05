import {useEffect, useState, useRef} from 'react';

const useProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://dummyjson.com/products?limit=10&skip=${skip}`,
      );
      const data = await res.json();
      setProducts(prevProducts => [...prevProducts, ...data?.products || []]);
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
      setSkip(prevSkip => prevSkip + 5);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [skip]);

  return {products, loading, loadMore, isFetchingMore};
};

export default useProductList;
