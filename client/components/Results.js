import React, {Component} from 'react';
// import { NavLink } from 'react-router-dom';
import {fetchDictionary} from '../store/dictionary';
import {postMatch, fetchCards} from '../store/game';
import {connect} from 'react-redux';


export default class Results extends Component {
    constructor(props)  {
      super(props);
      this.state = {
      };

    }
    render ()   {
        return (
          <div>
{/* // <!-- Modal --> */}
<div id="myModal" className="modal fade" role="dialog">
  <div className="modal-dialog">

    {/* <!-- Modal content--> */}
    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal">&times;</button>
        <h4 className="modal-title">Congratulations</h4>
      </div>
      <div className="modal-body">
        <p>You're success rate was turns per match. Congratulations! Review. Try a higher level.
        </p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>

  </div>
</div>
            </div>
        )
    }
}

// const mapStateToProps = (state) => {
//   return {
//     words: this.state.game.matches
//   }
// }
// const mapDispatchToProps = {fetchDictionary, postMatch, fetchCards};
// export default connect(mapStateToProps, mapDispatchToProps)(Results);
