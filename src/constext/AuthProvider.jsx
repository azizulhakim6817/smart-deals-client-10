import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { auth } from "./../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const gooleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //!Register----------
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //!sign-in/login---------
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //!signOut -----------
  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  //!google sing-in-------------
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, gooleProvider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      //console.log("user", currentUser);
      setUser(currentUser);

      //! jwt create/generate token frontent to backend request and create token
      if (currentUser) {
        const loggedUserEmail = { email: currentUser.email };

        fetch("https://smart-deals-server-10.vercel.app//getToken", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loggedUserEmail),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("After getting token : ", data.token);
            localStorage.setItem("token", data.token);
          });
      } else {
        localStorage.removeItem("token");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    setUser,
    loading,
    createUser,
    signInUser,
    signOutUser,
    googleSignIn,
  };

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
