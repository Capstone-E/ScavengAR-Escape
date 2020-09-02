import React from 'react'
import {ViroParticleEmitter, ViroNode} from 'react-viro'

function getSmoke() {
  var views = []
  views.push(
    <ViroParticleEmitter
      key={'effect_smoke'}
      position={[0, 0, 0]}
      scale={[1, 1, 1]}
      duration={20000}
      visible={true}
      run={true}
      loop={true}
      fixedToEmitter={true}
      image={{
        source: require('./res/particle_smoke.png'),
        height: 1,
        width: 1
      }}
      spawnBehavior={{
        particleLifetime: [20000, 20000],
        emissionRatePerSecond: [10, 15],
        maxParticles: 400,
        spawnVolume: {
          shape: 'box',
          params: [10, 0.1, 0.1],
          spawnOnSurface: false
        }
      }}
      particleAppearance={{
        scale: {
          initialRange: [[1, 1, 1], [1, 1, 1]],
          interpolation: [
            {endValue: [2, 2, 2], interval: [0, 10000]},
            {endValue: [1, 1, 1], interval: [10000, 19000]},
            {endValue: [0, 0, 0], interval: [19000, 20000]}
          ]
        },

        opacity: {
          initialRange: [0.0, 0.0],
          interpolation: [
            {endValue: 0.3, interval: [0, 1000]},
            {endValue: 0.1, interval: [10000, 18000]},
            {endValue: 0.0, interval: [18000, 20000]}
          ]
        }
      }}
      particlePhysics={{
        velocity: {
          initialRange: [[0.02, -0.05, 0.3], [-0.02, -0.1, -0.3]]
        },
        acceleration: {initialRange: [[0, 0, 0], [0, 0, 0]]}
      }}
    />
  )
  return views
}

function Smoke() {
  return <ViroNode key={100}>{getSmoke()}</ViroNode>
}

module.exports = Smoke
