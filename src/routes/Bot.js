import { BsThreeDots } from "react-icons/bs";
import { useNavigate } from 'react-router-dom'
import React, { useState, useEffect, useRef } from 'react'
import { confirm } from "react-confirm-box"
const customRender = {
  render: (message, onConfirm, onCancel) => {
    return (
      <div className="bg-dark py-4 px-5 rounded">
        <h2 className="mb-3">{message}</h2>
        <div className="d-flex justify-content-center">
          <button onClick={onConfirm} className="btn btn-outline-warning btn-sm mx-1">Yes</button>
          <button onClick={onCancel} className="btn btn-outline-warning btn-sm mx-1">No</button>
        </div>
      </div>
    );
  }
};
export const Bot = ({ user }) => {

  const navigate = useNavigate()
  useEffect(() => {
    if (!user.displayName) {
      return navigate("/login");
    }
  }, [user.displayName, navigate])
  const msgBox = useRef(null)
  const [chatHistory, setChatHistory] = useState([])
  const [loading, setLoading] = useState(false)
  const initiate = async () => {
    setLoading(true)
    const res = await fetch(`http://localhost:8000/chat/initiate`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        googleId: user.googleId
      })
    })
    const data = await res.json()
    console.log(data)
    if (data.value.message) {
      setChatHistory(
        data.value.message
      )
      msgBox.current.scrollIntoView({ behavior: 'smooth' })
    }
    setLoading(false)
  }
  useEffect(() => {
    if (user.googleId)
      initiate().catch(err => console.log(err))
  }, [user.googleId])
  const [inputVal, setInputVal] = useState('')

  const insertMsg = async (msg) => {
    const res = await fetch('http://localhost:8000/chat/insert', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ googleId: user.googleId, message: msg })
    })
    const data = await res.json()
    console.log('chatchat', data)
    setChatHistory(data.value.message)
    setInputVal('')
    msgBox.current.scrollIntoView({ behavior: 'smooth' })
    setLoading(false)
  }

  const sendMessage = () => {
    console.log(inputVal)
    setLoading(true)
    const q = encodeURIComponent(inputVal.trim());
    const uri = 'https://api.wit.ai/message?v=20220409&q=' + q;
    const auth = 'Bearer ' + 'CZPNNMLPBAFSM3AOZQ66CUHMBC2QU4YJ';
    fetch(uri, { headers: { Authorization: auth } })
      .then(res => res.json())
      .then(res => {
        console.log(Object.values(res.entities))
        const [[reply]] = Object.values(res.entities)
        console.log(reply)
        // initiate({
        //   ...chatData,
        //   message: [
        //     ...chatHistory,
        //     { user: reply.body, reply: reply.value }
        //   ]
        // }).catch(err => console.log(err))
        insertMsg({ user: reply.body, reply: reply.value }).catch(err => console.log(err))
      })
      .catch(err => console.log(err))

  }
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage()
  }
  const clearHistory = async (options) => {
    const result = await confirm("Are you sure?", options)
    if (result) {
      try {
        await fetch(`http://localhost:8000/chat/${user.googleId}`, {
          method: 'DELETE',
        })
        setChatHistory([])
        initiate()
      } catch (err) {
        console.log(err)
      }
      return
    }
  }

  return (
    <div className="d-flex flex-column justify-content-around" style={{ height: '90vh' }}>
      <section style={{ height: '80%' }} className="px-2 mb-2 overflow-auto w-75 d-flex flex-column align-items-center mt-5 mx-auto">
        <p className="w-75 fs-3 align-self-start chat-text">
          "{user.displayName}, the spirits told me you were looking for me. I am Chatbot, I'll be your guide. Would you like me to read your fortunes?"
        </p>
        {chatHistory.map((x, i) => (
          <React.Fragment key={i}>
            <p className="w-75 fs-3 align-self-end chat-text text-light text-end">
              "{x.user}"
            </p>
            <p className="w-75 fs-3 align-self-start chat-text">
              "{x.reply}"
            </p>

          </React.Fragment>
        ))}
        <div style={{ float: "left", clear: "both" }}
          ref={msgBox}>
        </div>
      </section>
      <div className="w-75 align-self-center px-2">
        <BsThreeDots className="display-5 d-block" style={{ opacity: loading ? '1' : '0' }} />
        {/* <input type="text" className="form-control rounded-pill text-light w-75 d-inline-block" placeholder="chat" />
        <button type="button" className="btn btn-link text-decoration-none">Send</button> */}
        <div className="input-group mb-3">
          <input value={inputVal} onKeyPress={handleKeyPress} onChange={e => setInputVal(e.target.value)} type="text" className="form-control rounded-pill text-light" placeholder="Chat" aria-label="chat" aria-describedby="send" />
          <button onClick={sendMessage} className="btn btn-link text-decoration-none" type="button" id="send">Send</button>
          <button onClick={() => clearHistory(customRender)} className="btn btn-link text-decoration-none" type="button" id="delete">Clear</button>
        </div>
      </div>
    </div>
  )
}