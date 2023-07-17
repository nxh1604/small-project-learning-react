import { useState, useEffect } from "react";

const KEY = "dc0ee99a";

export function useMovies(query, action?) {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    const makeFetch = async () => {
      try {
        setError("");
        setLoading(true);
        const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`, {
          signal: controller.signal,
        });
        if (!res.ok) {
          throw new Error("some thing went wrong with fetching movies");
        }
        const data = await res.json();
        if (data.Response === "False") {
          throw new Error(data.Error);
        }
        setMovies(data.Search);
      } catch (err: any) {
        movies(null);
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    action?.(null);
    const delaySearch = setTimeout(() => {
      makeFetch();
    }, 1000);

    return () => {
      clearTimeout(delaySearch);
      controller.abort();
    };
  }, [query, action]);

  return { movies, loading, error };
}
