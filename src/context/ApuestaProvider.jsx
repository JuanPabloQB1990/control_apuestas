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
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../Firebase";
import { AuthContext } from "./AuthProvider";

export const ApuestaContext = createContext();

const ApuestaProvider = ({ children }) => {
  const [show, setShow] = useState(false);
  const [mercados, setMercados] = useState([]);
  const [ligas, setLigas] = useState([]);
  const { userData } = useContext(AuthContext);
  const [apuestasUsuario, setApuestasUsuario] = useState([]);
  const [actualizarApuestaFiltrada, setActualizarApuestaFiltrada] = useState({});
  const [actualizarLigaFiltrada, setActualizarLigaFiltrada] = useState({});
  const [editandoApuesta, setEditandoApuesta] = useState(false);
  const [editandoLiga, setEditandoLiga] = useState(false);
  const [showModalLiga, setShowModalLiga] = useState(false);

  const obtenerApuestas = useCallback(async (mercado) => {
    
    const apuestas = [];

    if (mercado == undefined || mercado === "Todos los mercados") {
      const q = query(collection(db, "apuestas"),  where("id_usuario", "==", userData.uid), orderBy("fecha", "asc"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        apuestas.push(doc.data());
      });
      setApuestasUsuario(apuestas);
      
    }else{
      const q = query(collection(db, "apuestas"),  where("id_usuario", "==", userData.uid), orderBy("fecha", "asc"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        apuestas.push(doc.data());
      });
      const datos = apuestas.filter(apuesta => apuesta.lineas.map(linea => linea.mercado == mercado)[0])
      
      setApuestasUsuario(datos);
    }
}, [userData]);

  const obtenerMercados = async() => {
    const mercados = []
    const q = query(collection(db, "mercados"), orderBy("id", "asc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      mercados.push(doc.data());
    });

    setMercados(mercados)
  }

  const obtenerLigas = useCallback(async() => {
    const ligas = []
    const q = query(collection(db, "ligas"), orderBy("nombre", "asc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      ligas.push(doc.data());
    });

    setLigas(ligas)
  }, [])
  

  const crearApuesta = async (apuesta) => {
      await addDoc(collection(db, "apuestas"), apuesta);
      obtenerApuestas();
    };

  useEffect(() => {
    obtenerApuestas();
    obtenerMercados()
    obtenerLigas()
  }, [obtenerApuestas, obtenerLigas]);

  const seleccionEditarApuesta = async(apuesta) => {
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

  const crearLiga = async (liga) => {

    const nuevaLiga = {
      id: ligas.length + 1,
      nombre: liga
    }

    await addDoc(collection(db, "ligas"), nuevaLiga)
    obtenerLigas()
  };

  const seleccionEditarLiga = async(liga) => {
    
    setActualizarLigaFiltrada(liga)
    setShowModalLiga(true)
    setEditandoLiga(true)
  }

  const editarLiga = async(ligaEditada) => {
    
    const q = query(collection(db, "ligas"), where("id", "==", ligaEditada.id));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async(docu) => {
      const ligaRef = doc(db, "ligas", docu.id);
      await updateDoc(ligaRef, ligaEditada)
    });
    obtenerLigas()
  }
  

  return (
    <ApuestaContext.Provider
      value={{
        setShow,
        show,
        mercados,
        ligas,
        crearApuesta,
        apuestasUsuario,
        seleccionEditarApuesta,
        actualizarApuestaFiltrada,
        editarApuesta,
        editandoApuesta,
        setEditandoApuesta,
        eliminarApuestaDB,
        obtenerApuestas,
        setShowModalLiga,
        showModalLiga,
        crearLiga,
        seleccionEditarLiga,
        editandoLiga,
        actualizarLigaFiltrada,
        editarLiga,
        setEditandoLiga
      }}
    >
      {children}
    </ApuestaContext.Provider>
  );
};

export default ApuestaProvider;
