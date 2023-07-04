import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { ToggleStatus } from '../db';

type Props = {
  item: toDo;
}

type toDo = {
  id: string;
  nome: string;
  status: boolean;
};

const Checkbox = ({ item }: Props) => {
  const [isChecked, setIsChecked] = useState(item.status);

  const handleToggleStatus = () => {
    ToggleStatus(item.id)
      .then(() => {
        setIsChecked(!isChecked);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    setIsChecked(item.status);
  }, [item.status]);

  return (
    <TouchableOpacity style={styles.container} onPress={handleToggleStatus}>
      <View
        style={[
          styles.checkbox,
          isChecked ? styles.checked : styles.unchecked,
        ]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
  },
  checked: {
    backgroundColor: '#00FF7F',
    borderColor: '#00FF7F',
  },
  unchecked: {
    backgroundColor: '#1B1B1E',
    borderColor: '#bdc3c7',
  },
});

export default Checkbox;