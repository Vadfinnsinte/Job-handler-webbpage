import { useState } from "react"
import { createPost } from "../services/postService"
import InputLabel from "./InputLabel"

export default function CreatePost() {

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

      setTitle("")
      setCompanyName("")
      setLink("")
      setStatus("")
      setAdText("")
      setApplicationDate("")

      alert("Post created!")

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
    <div className="sign-up-in-container">
    <h2>Create Job Application</h2>
    
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
  )
}