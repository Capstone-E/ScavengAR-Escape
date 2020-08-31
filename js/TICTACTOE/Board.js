import React from 'react';
import { ViroFlexView } from 'react-viro';

import { Button } from 'react-native';
export const Box = (props) => {
  return (
    <Button title="button" onPress={props.onCPress}>
      {props.value}
    </Button>
  );
};

// const Square = ({ value, onCLick }) => {
//   const style = value ? `squares ${value}` : `squares`;
//   return (
//     <ViroFlexView backgroundColor="black" border="solid" font-size="5rem">
//       <button className={style} onClick={onClick}>
//         {value}
//       </button>
//       ;
//     </ViroFlexView>
//   );
// };

// export default Square;
