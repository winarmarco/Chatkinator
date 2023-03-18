import React from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../store/ui-slice';

const Backdrop = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.ui.sidebar.show);


  const toggleShowSidebar = () => {
    dispatch(uiActions.toggleSidebar());
  }

  return ReactDOM.createPortal(
    <div className={"fixed w-screen h-screen bg-black bg-opacity-50 z-20 ".concat(!show && "hidden")} onClick={toggleShowSidebar}>
    </div>
  , document.getElementById("backdrop"));
}

export default Backdrop