import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';

export function Button({ title, ...rest }) {
  return (
    <TouchableOpacity style={styles.button} {...rest}>
      <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 18}}>{ title }</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#027DFF',
    height: 58,
    width: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
});