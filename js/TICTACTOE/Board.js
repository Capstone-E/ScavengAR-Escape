import React from 'react';
import { ViroButton } from 'react-viro';
import { Button } from 'react-native';
export const Box = (props) => {
  return (
    <Button title="button" onPress={props.onCPress}>
      {props.value}
    </Button>
  );
};
