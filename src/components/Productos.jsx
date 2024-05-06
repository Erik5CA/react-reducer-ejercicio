import { useRef } from "react";
import { useState } from "react";
import { useReducer } from "react";

const initialState = [];

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_PRODUCTO":
      return [...state, action.payload];
    case "REMOVE_PRODUCTO": {
      const newState = [...state];
      return newState.filter((producto) => producto.id !== action.payload);
    }
    case "ADD_UNIDAD": {
      const newState = [...state];
      return newState.map((producto) => {
        if (producto.id === action.payload) {
          return {
            ...producto,
            unidades: producto.unidades + 1,
          };
        }
        return producto;
      });
    }
    case "REMOVE_UNIDAD": {
      const newState = [...state];
      return newState.map((producto) => {
        if (producto.id === action.payload) {
          return {
            ...producto,
            unidades: producto.unidades === 1 ? 1 : producto.unidades - 1,
          };
        }
        return producto;
      });
    }
    default:
      return state;
  }
};

function Productos() {
  const inputName = useRef(null);
  const [nombreProducto, setNombreProducto] = useState("");
  const [productos, dispatch] = useReducer(reducer, initialState);

  const handleAddProducto = () => {
    if (nombreProducto === "") return;
    inputName.current.focus();
    setNombreProducto("");
    const newProducto = {
      id: crypto.randomUUID(),
      nombre: nombreProducto,
      unidades: 1,
    };
    dispatch({ type: "ADD_PRODUCTO", payload: newProducto });
  };

  return (
    <div>
      <h2>Productos</h2>
      <div>
        <label htmlFor="producto">Producto: </label>
        <input
          ref={inputName}
          type="text"
          value={nombreProducto}
          id="producto"
          onChange={(e) => setNombreProducto(e.target.value)}
        />
        <button onClick={handleAddProducto}>Añadir</button>
      </div>
      <div>
        <ul>
          {productos.map((producto) => (
            <li key={producto.id}>
              {producto.nombre} ({producto.unidades} unidades)
              <button
                onClick={() =>
                  dispatch({ type: "ADD_UNIDAD", payload: producto.id })
                }
              >
                +
              </button>
              <button
                onClick={() =>
                  dispatch({ type: "REMOVE_UNIDAD", payload: producto.id })
                }
              >
                -
              </button>
              <button
                onClick={() =>
                  dispatch({
                    type: "REMOVE_PRODUCTO",
                    payload: producto.id,
                  })
                }
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Productos;
