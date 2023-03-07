import React from 'react'
import { useDispatch } from 'react-redux'
import { chatActions } from '../store/chat-slice';
import { uiActions } from '../store/ui-slice';

const Clear = () => {
  const dispatch = useDispatch();

  const clickHandler = () => {dispatch(chatActions.clearChat());}
  const stopLoading = () => {dispatch(uiActions.toggleFetch())};
  const clearChats = () => {dispatch(chatActions.clearChat())};

  return (
    <div>
    <button onClick={clickHandler}>button</button>
    <button onClick={stopLoading}>button</button>
    <button onClick={clearChats}>button</button>
    </div>
  )
}

export default Clear;