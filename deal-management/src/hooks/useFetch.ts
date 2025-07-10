import { useState } from "react";

const useFetch = (url: string, query: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
 const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const fetchData = async () => {
    if (!query || query.trim() === "") {
        return;
    }
    setLoading(true);
    setShowSuggestions(false);
    
    try {
      const response = await fetch(url);
      const jsonData = await response.json();
      setData(jsonData.items || []);
      setShowSuggestions(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setShowSuggestions(false);
    }
  };

  return {
    data,
    loading,
    fetchData,
    setShowSuggestions,
    showSuggestions,
  };
};

export default useFetch;
