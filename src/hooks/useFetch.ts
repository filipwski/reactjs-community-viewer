import { useEffect, useState } from 'react';

export const useFetch = (query: string) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      setLoading(true);
      const response = await fetch(query, {
        headers: { Accept: 'application/json' }
      });
      const data = await response.json();
      setData(data);
      setLoading(false);
    };

    fetchData();
  }, [query]);

  return { loading, data };
};
