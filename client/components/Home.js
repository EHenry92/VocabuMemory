import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'

export function Home (props){
        return (
            <div>
              <h1> VocabuMemory </h1>
              <h3> Practice you vocabulary skills with this memory matching game</h3>
              <div> <Link to="/game">Play!!</Link> </div>

              </div>
        )
}

const mapStateToProps = (state) => {
  return {}
}
const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
