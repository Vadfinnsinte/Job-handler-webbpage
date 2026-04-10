import { useState } from "react"
import { createPost } from "../services/postService"
import InputLabel from "./InputLabel"

const CreatePost = ({ closePost, showToast, refreshFeed }) => {

  const [title, setTitle] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [link, setLink] = useState("")
  const [status, setStatus] = useState("")
  const [adText, setAdText] = useState("")
  const [applicationDate, setApplicationDate] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newPost = {
      title,
      companyName,
      link,
      status,
      adText,
      applicationDate
    }

    try {
  await createPost(newPost)

    closePost()
    showToast()
    refreshFeed();

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="create-post-overlay">

    <div className="sign-up-in-layout">

    <form onSubmit={handleSubmit}>
    <div className="sign-up-in-container">
    <h2>Create Job Application</h2>
    <button
    type="button"
    className="close-btn"
    onClick={closePost}
    >
      ✕
    </button>
    
    <div className="input-label-layout">
      <InputLabel type={"text"} labelTxt={"Job Title"} value={title} setValue={setTitle}/>
      <InputLabel type={"text"} labelTxt={"Company Name"} value={companyName} setValue={setCompanyName}/>
      <InputLabel type={"text"} labelTxt={"Job Link"} value={link} setValue={setLink}/>
      <InputLabel type={"text"} labelTxt={"Status"} value={status} setValue={setStatus}/>
      
      <label>Ad Text</label>
      <textarea
        className="big-input"
        value={adText}
        onChange={(e) => setAdText(e.target.value)}
      />

      <InputLabel type={"date"} labelTxt={"Application Date"} value={applicationDate} setValue={setApplicationDate}/>

    </div>
    <button type="submit">Create Post</button>
    </div>
    </form>
    </div>
    </div>
  )
}
export default CreatePost