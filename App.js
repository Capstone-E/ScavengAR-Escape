/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, {Component} from 'react'
import Main from './Main'
import store from './store'
import {Provider} from 'react-redux'

const ScavengARescape = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  )
}

module.exports = ScavengARescape
