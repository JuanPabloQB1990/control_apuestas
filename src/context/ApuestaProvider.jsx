import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../Firebase";
import { AuthContext } from "./AuthProvider";
import { toast } from "react-toastify";

export const ApuestaContext = createContext();

const ApuestaProvider = ({ children }) => {
  const [show, setShow] = useState(false);
  const [mercados, setMercados] = useState([]);
  const { userData } = useContext(AuthContext);
  const [apuestasUsuario, setApuestasUsuario] = useState([]);
  const [actualizarApuestaFiltrada, setActualizarApuestaFiltrada] = useState({});
  const [editandoApuesta, setEditandoApuesta] = useState(false);

  const obtenerApuestas = useCallback(async () => {
    const apuestas = [];

    const q = query(collection(db, "apuestas"),  where("id_usuario", "==", userData.uid), orderBy("fecha", "asc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      apuestas.push(doc.data());
    });

    setApuestasUsuario(apuestas);
  }, [userData]);

  const obtenerMercados = async() => {

    const mercados = []
    const q = query(collection(db, "mercados"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      mercados.push(doc.data());
    });

    setMercados(mercados)
  }
  

  const crearApuesta = async (apuesta) => {
      console.log(apuesta);
      await addDoc(collection(db, "apuestas"), apuesta);
      toast("Apuesta realizada!!");
      obtenerApuestas();
    };

  useEffect(() => {
    obtenerApuestas();
    obtenerMercados()
  }, [obtenerApuestas]);

  const seleccionEditarApuesta = async (apuesta) => {
    setActualizarApuestaFiltrada(apuesta)
    setEditandoApuesta(true)
    setShow(true)
  };

  const editarApuesta = async(apuestaEditada) => {
    
    const q = query(collection(db, "apuestas"), where("id", "==", apuestaEditada.id));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async(docu) => {
      const apuestaRef = doc(db, "apuestas", docu.id);
      await updateDoc(apuestaRef, apuestaEditada)
    });

    obtenerApuestas();
  }

  const eliminarApuestaDB = async(id) => {
    const q = query(collection(db, "apuestas"), where("id", "==", id));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async(docu) => {
      
      await deleteDoc(doc(db, "apuestas", docu.id));

    });

    obtenerApuestas();
  }
  
  return (
    <ApuestaContext.Provider
      value={{
        setShow,
        show,
        mercados,
        crearApuesta,
        apuestasUsuario,
        seleccionEditarApuesta,
        actualizarApuestaFiltrada,
        editarApuesta,
        editandoApuesta,
        setEditandoApuesta,
        eliminarApuestaDB
      }}
    >
      {children}
    </ApuestaContext.Provider>
  );
};

export default ApuestaProvider;
