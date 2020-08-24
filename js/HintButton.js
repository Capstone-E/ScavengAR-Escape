// import React, { Component } from 'react';
// import { ViroButton, View, Text, ViroARCamera } from 'react-viro';

// export default class HintButton extends Component {
//   constructor() {
//     super();
//     this.state = {
//       hints: {
//         count: 0,
//         1: 'blah',
//         2: 'blahh',
//         3: 'blahhh',
//       },
//       buttonStateTag: null,
//     };
//   }
//   render() {
//     return (
//       <ViroARCamera>
//         <ViroButton
//           source={require('./res/info.png')}
//           tapSource={require('./res/info-tap.png')}
//           position={[1.5, 3.25, -6]}
//           height={1}
//           width={1}
//           onTap={this.onTap}
//         />
//       </ViroARCamera>
//     );
//   }

//   onTap() {
//     this.setState({
//       buttonStateTag: 'onTap',
//     });
//     this.hints.count += 1;
//   }

//   displayHint() {
//     const hints = this.state.hints;
//     const count = this.state.hints.count;
//     const buttonStateTag = this.state.buttonStateTag;
//     return (
//       <View>
//         {buttonStateTag === null ? (
//           ''
//         ) : (
//           <Text>{hints.count <= 3 ? hints[count] : 'No hints left'}</Text>
//         )}
//       </View>
//     );
//   }
// }
