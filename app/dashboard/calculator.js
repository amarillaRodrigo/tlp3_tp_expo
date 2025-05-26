import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, Surface } from 'react-native-paper';

export default function CalculatorScreen() {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const inputDigit = (digit) => {
    if (waitingForSecondOperand) {
      setDisplay(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay('0.');
      setWaitingForSecondOperand(false);
      return;
    }

    if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clearDisplay = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplay(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (firstOperand, secondOperand, operator) => {
    switch (operator) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '*':
        return firstOperand * secondOperand;
      case '/':
        return firstOperand / secondOperand;
      default:
        return secondOperand;
    }
  };

  const renderButton = (value, onPress, color = '#E0E0E0', textColor = '#000') => (
    <Button
      mode="contained"
      style={[styles.button, { backgroundColor: color }]}
      labelStyle={{ color: textColor, fontSize: 24 }}
      onPress={onPress}
    >
      {value}
    </Button>
  );

  return (
    <View style={styles.container}>
      <Surface style={styles.displayContainer} elevation={4}>
        <Text style={styles.displayText} numberOfLines={1} ellipsizeMode="tail">
          {display}
        </Text>
      </Surface>

      <View style={styles.buttonRow}>
        {renderButton('C', clearDisplay, '#ff6961', '#fff')}
        {renderButton('±', () => setDisplay(String(-1 * parseFloat(display))))}
        {renderButton('%', () => setDisplay(String(parseFloat(display) / 100)))}
        {renderButton('÷', () => performOperation('/'), '#f39c12', '#fff')}
      </View>

      <View style={styles.buttonRow}>
        {renderButton('7', () => inputDigit('7'))}
        {renderButton('8', () => inputDigit('8'))}
        {renderButton('9', () => inputDigit('9'))}
        {renderButton('×', () => performOperation('*'), '#f39c12', '#fff')}
      </View>

      <View style={styles.buttonRow}>
        {renderButton('4', () => inputDigit('4'))}
        {renderButton('5', () => inputDigit('5'))}
        {renderButton('6', () => inputDigit('6'))}
        {renderButton('-', () => performOperation('-'), '#f39c12', '#fff')}
      </View>

      <View style={styles.buttonRow}>
        {renderButton('1', () => inputDigit('1'))}
        {renderButton('2', () => inputDigit('2'))}
        {renderButton('3', () => inputDigit('3'))}
        {renderButton('+', () => performOperation('+'), '#f39c12', '#fff')}
      </View>

      <View style={styles.buttonRow}>
        {renderButton('0', () => inputDigit('0'), '#E0E0E0', '#000', 2)}
        {renderButton('.', inputDecimal)}
        {renderButton('=', () => performOperation('='), '#3498db', '#fff')}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  displayContainer: {
    backgroundColor: '#fff',
    padding: 24,
    marginBottom: 24,
    borderRadius: 8,
    alignItems: 'flex-end',
  },
  displayText: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  button: {
    width: '23%',
    height: 64,
    justifyContent: 'center',
  },
  doubleButton: {
    width: '48%',
  }
});