import { createContext, useEffect, useContext, useReducer, useCallback } from "react";

const BASE_URL = "http://localhost:3000";

interface IGEOLOCATION {
  lat: number;
  lng: number;
}

interface ICITY {
  cityName: string;
  country: string;
  emoji: string;
  date: string | Date;
  notes: string;
  position: IGEOLOCATION;
  id?: number;
}

interface ICITIESCONTEXT {
  cities: null | Array<ICITY>;
  currentCity: null | ICITY;
  isLoading: boolean;
  error: string;
  getCurrentCity: (id: number | string | undefined) => void;
  createNewCity: (newCity: ICITY) => void;
  deleteCity: (id: string | number | undefined) => void;
}

// cities, isLoading, currentCity, error, getCurrentCity, createNewCity, deleteCity

const CitiesContext = createContext<ICITIESCONTEXT>({
  cities: null,
  isLoading: false,
  currentCity: null,
  error: "",
  getCurrentCity: () => undefined,
  createNewCity: () => undefined,
  deleteCity: () => undefined,
});

const initialState = {
  cities: null,
  currentCity: null,
  isLoading: false,
  error: "",
};

const reducer = (state, action) => {
  switch (action.type.toLowerCase()) {
    case "loading": {
      return { ...state, isLoading: true };
    }
    case "cities/loaded": {
      return { ...state, isLoading: false, cities: action.payload };
    }
    case "city/created": {
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    }
    case "city/deleted": {
      return {
        ...state,
        isLoading: false,
        cities: state.cities?.filter((el) => el.id !== action.payload),
      };
    }
    case "city/loaded": {
      return { ...state, isLoading: false, currentCity: action.payload };
    }
    case "error": {
      return { ...state, isLoading: false, error: action.payload };
    }
    default: {
      throw new Error("Action type not found!");
    }
  }
};

const CitiesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { cities, currentCity, isLoading, error } = state;
  useEffect(() => {
    dispatch({ type: "loading" });
    async function getCites() {
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({ type: "error", payload: "Failed to load cities" });
      }
    }
    getCites();
  }, []);

  const getCurrentCity = useCallback(
    async (id) => {
      if (id === currentCity?.id) return;

      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        dispatch({ type: "city/loaded", payload: data });
      } catch {
        dispatch({ type: "error", payload: "Failed to load current city" });
      }
    },
    [currentCity?.id]
  );

  const createNewCity = async (newCity) => {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities/`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({ type: "error", payload: "Failed to create new city" });
    }
  };

  const deleteCity = async (id) => {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({ type: "error", payload: "Failed to create new city" });
    }
  };

  return (
    <CitiesContext.Provider
      value={{ cities, isLoading, currentCity, error, getCurrentCity, createNewCity, deleteCity }}>
      {children}
    </CitiesContext.Provider>
  );
};

const useCitiesContext = () => {
  const context = useContext(CitiesContext);
  if (context === undefined) throw new Error("Cities context is used outside of its provider");
  return context;
};

export { useCitiesContext, CitiesProvider };
