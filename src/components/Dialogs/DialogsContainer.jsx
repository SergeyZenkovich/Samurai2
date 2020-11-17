import Dialogs from './Dialogs';
import { addMessage } from '../../Redux/dialogsReducer'
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../hocs/withAuthRedirect';
import { compose } from 'redux';


let mapStateToProps = (state) => {
    return {
        dialogs: state.dialogs,
    }
}

const DialogsContainer = compose(
    connect(mapStateToProps, { addMessage }),
    withAuthRedirect
)(Dialogs)


export default DialogsContainer;