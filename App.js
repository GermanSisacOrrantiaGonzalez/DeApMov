import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBzTn2fR_qID0W5bUQle8OHd8KFOMLFDOk",
  authDomain: "examenparcial2-b799d.firebaseapp.com",
  projectId: "examenparcial2-b799d",
  storageBucket: "examenparcial2-b799d.appspot.com",
  messagingSenderId: "343444317399",
  appId: "1:343444317399:web:a47e12e52e3b6282da3c92",
  measurementId: "G-RCSZ4W6Q0B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const AuthScreen = ({ email, setEmail, password, setPassword, isLogin, setIsLogin, handleAuthentication }) => {
  return (
    <View style={styles.authContainer}>
      <Text style={styles.title}>{isLogin ? 'Sign In' : 'Login'}</Text>
      <TextInput
        style={styles.input}
        placeholder='Email'
        value={email}
        onChangeText={setEmail}
        autoCapitalize='none'
        placeholderTextColor="#BDBDBD"
      />
      <TextInput
        style={styles.input}
        placeholder='Password'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#BDBDBD"
      />
      <TouchableOpacity style={styles.button} onPress={handleAuthentication}>
        <Text style={styles.buttonText}>{isLogin ? 'Sign In' : 'Login'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={styles.toggleText}>{isLogin ? 'Create an account' : 'Login'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const AuthenticationScreen = ({ user, handleLogout }) => {
  return (
    <View style={styles.authContainer}>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.emailText}>{user.email}</Text>
      <Text style={styles.messageText}>Your email has been registered successfully</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const handleAuthentication = () => {
    if (isLogin) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setUser(userCredential.user);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setUser(userCredential.user);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      {user ? (
        <AuthenticationScreen user={user} handleLogout={handleLogout} />
      ) : (
        <AuthScreen
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          handleAuthentication={handleAuthentication}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#424242',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff',
    bottom: 240
  },
  input: {
    height: 50,
    borderColor: '#555',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    color: '#fff',
    width: 320,
    height: 60
  },
  button: {
    backgroundColor: '#E53935',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    top: 270,
    width: 160,
    height: 60
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  toggleText: {
    color: '#E53935',
    textAlign: 'center',
    fontSize: 16,
  },
  emailText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
    marginBottom: 10,
    bottom: 240
  },
  messageText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#BDBDBD',
    marginBottom: 20,
  },
});
