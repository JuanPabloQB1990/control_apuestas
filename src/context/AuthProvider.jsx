import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../Firebase";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [userAuth, setUserAuth] = useState(false);
  const [errors, setErrors] = useState("");
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const consultaUsuario = async() => {
      if (userAuth) {
        
        const q = query(collection(db, "usuarios"), where("uid", "==", userAuth.uid));
        const usuario = await getDocs(q);
        usuario.forEach((user) => {
          setUserData(user.data());
        });
      }
    }
    
    consultaUsuario()
  }, [userAuth]);

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserAuth(user);
      } else {
        setUserAuth(null);
      }

      return () => unsuscribe()
    });

  }, []);
  
  //console.log(userAuth.uid);

  const registroUsuario = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        
        setDoc(doc(db, "usuarios", user.uid), {
          uid: user.uid,
          nombre: name,
          bank_inicial: 0,
          total_apostado: 0,
          cantidad_apuestas: 0,
          ganados: 0,
          nulos: 0,
          perdidos: 0,
        });

        setMessage("Registro satisfactorio");
        setErrors("");
        setEmail("");
        setName("");
        setPassword("");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setMessage("");
        if (errorCode === "auth/email-already-in-use") {
          setErrors("Este email ya se encuentra registrado");
        }

        if (errorCode === "auth/weak-password") {
          setErrors("La password debe tener 6 o mas caracteres");
        }

        if (errorCode === "auth/invalid-email") {
          setErrors("Email invalido");
        }
      });
  };

  const loginUsuarios = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUserAuth(user);
        setEmail("")
        setPassword("")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === "auth/invalid-credential") {
          setErrors("Password incorrecta");
        }
      });
  };

  const cerrarSesion = () => {
    signOut(auth)
      .then(() => {
        
      })
      .catch((error) => {
        
      });
  };

  return (
    <AuthContext.Provider
      value={{
        userAuth,
        userData,
        registroUsuario,
        cerrarSesion,
        loginUsuarios,
        errors,
        setErrors,
        message,
        setMessage,
        setEmail,
        setName,
        setPassword,
        email,
        name,
        password,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
