import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
// import TextEditor from "./components/TextEditor";
import TextEditorHooks from "./components/TextEditorHooks";
import axios from "axios";

const getAPIData = async () => {
  const {
    data: { data },
  } = await axios.get("http://localhost:5000/api/posts");
  return data;
};

const postAPIData = async (data) => {
  const resp = await axios.post("http://localhost:5000/api/posts", { data });
  console.log("resp :>> ", resp);
  return resp;
};

function App() {
  const [posts, setPosts] = useState();
  const [ initHTML, setInitHTML ] = useState('')

  const handleCreatePost = async (data) => {
    console.log("data :>> ", data);
    const allPosts = await postAPIData(data);
    setPosts(allPosts.data.data)
  };

  useEffect(() => {
    getAPIData().then((data) => {
      console.log("data :>> ", data);
      setPosts(data);
      setInitHTML('<p>Hello World</p>')
    });
  }, [setPosts]);

  const options = ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history']


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>React Text Editor</h1>
      </header>
      <div className="editor">
        {/* <TextEditor /> */}
        <TextEditorHooks handleCreatePost={handleCreatePost} initHTML={initHTML} options={options} />
      </div>

      <hr />

      {posts &&
        posts.map((p, i) => (
          <div className="post-wrapper" key={i} dangerouslySetInnerHTML={{ __html: p.data }}></div>
        ))}
    </div>
  );
}

export default App;
