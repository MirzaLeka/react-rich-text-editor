import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
// import TextEditor from "./components/TextEditor";
import TextEditorHooks from "./components/TextEditorHooks";
import axios from "axios";

const getAPIData = async () => {
  const {
    data: { data },
  } = await axios.get("http://localhost:9999/html");
  return data;
};

const postAPIData = async (data) => {
  const resp = await axios.post("http://localhost:9999/html", { data });
  console.log("resp :>> ", resp);
  return resp;
};

function App() {
  const [posts, setPosts] = useState();

  const handleCreatePost = async (data) => {
    console.log("data :>> ", data);
    const allPosts = await postAPIData(data);
    setPosts(allPosts.data.data)
  };

  useEffect(() => {
    getAPIData().then((data) => {
      console.log("data :>> ", data);
      setPosts(data);
    });
  }, [setPosts]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>React Text Editor</h1>
      </header>
      <div className="editor">
        {/* <TextEditor /> */}
        <TextEditorHooks handleCreatePost={handleCreatePost} />
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
