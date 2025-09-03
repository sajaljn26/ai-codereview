import { useState , useEffect } from 'react'
import Prism from "prismjs"
import "prismjs/themes/prism-tomorrow.css"
import "prismjs/components/prism-javascript"
import Editor from  "react-simple-code-editor"
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Markdown from "react-markdown"
import axios from "axios"

function App() {
  const [count, setCount] = useState(0)
  const [code,setcode] = useState(`
function sum() {
  return 1 + 1;
}
  `)

  const [review,setreview] = useState(``)

  useEffect(()=>{
    Prism.highlightAll();
  }, [])

  async function reviewCode(){
    try {
      console.log("Sending code for review:", code);
      const response = await axios.post("http://localhost:3000/ai/get-review",{code})
      console.log("Response received:", response.data);
      setreview(response.data.response || response.data)
    } catch (error) {
      console.error("Error during review:", error);
      setreview("Error: " + (error.response?.data || error.message))
    }
  } 

  return (
    <>
      <main>
        <div className='left'>
          <div className='code'>
            <Editor
              value={code}
              onValueChange={setcode}
              highlight={code => Prism.highlight(code, Prism.languages.javascript, 'javascript')}
              padding={10}
              style={{
                fontFamily: '"Fira Code", "Monaco", "Consolas", monospace',
                fontSize: 16,
                backgroundColor: 'transparent',
                color: 'white'
              }}
            />
            <div className='review'>
              <button className='review-btn' onClick={reviewCode}>Review Code</button>
            </div>
          </div>
        </div>
        <div className='right'>
          <Markdown>{review}</Markdown>
        </div>
      </main>
    </>
  )
}


export default App
