import { BsThreeDots } from "react-icons/bs";

export const Bot = () => {
  return (
    <div className="d-flex flex-column justify-content-around" style={{ height: '90vh' }}>
      <section style={{ height: '80%' }} className="mb-2 overflow-auto w-75 d-flex flex-column align-items-center mt-5 mx-auto">
        <p className="w-75 fs-3 align-self-start chat-text">
          “James, the spirits told me you were looking for me. I'm Chatbot, I'll be your guide. Would you like me to read your fortunes?”
        </p>
        <p className="w-75 fs-3 align-self-end chat-text text-light text-end">
          “Yes please.”
        </p>
        <p className="w-75 fs-3 align-self-start chat-text">
          “James, the spirits told me you were looking for me. I'm Chatbot, I'll be your guide. Would you like me to read your fortunes?”
        </p>
        <p className="w-75 fs-3 align-self-start chat-text">
          “James, the spirits told me you were looking for me. I'm Chatbot, I'll be your guide. Would you like me to read your fortunes?”
        </p>
        <p className="w-75 fs-3 align-self-start chat-text">
          “James, the spirits told me you were looking for me. I'm Chatbot, I'll be your guide. Would you like me to read your fortunes?”
        </p>
        <p className="w-75 fs-3 align-self-start chat-text">
          “James, the spirits told me you were looking for me. I'm Chatbot, I'll be your guide. Would you like me to read your fortunes?”
        </p>
        <p className="w-75 fs-3 align-self-start chat-text">
          “James, the spirits told me you were looking for me. I'm Chatbot, I'll be your guide. Would you like me to read your fortunes?”
        </p>
        <p className="w-75 fs-3 align-self-start chat-text">
          “James, the spirits told me you were looking for me. I'm Chatbot, I'll be your guide. Would you like me to read your fortunes?”
        </p>
      </section>
      <div className="w-75 align-self-center">
        <BsThreeDots className="display-5" />
        <input type="text" className="form-control rounded-pill" placeholder="chat" />
      </div>
    </div>
  )
}