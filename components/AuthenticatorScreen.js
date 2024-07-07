import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { signOut } from 'firebase/auth';

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

const styles = StyleSheet.create({
  authContainer: {
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
  },
  emailText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
    marginBottom: 10,
  },
  messageText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#BDBDBD',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#E53935',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: 160,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default AuthenticationScreen;
