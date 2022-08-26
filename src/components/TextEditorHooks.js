import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";
import "./editor.css";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";

const TextEditorHooks = ({ handleCreatePost }) => {
  const sampleMarkup =
    "<b>Bold text</b>, <i>Italic text</i><br/ ><br />" +
    '<a href="http://www.facebook.com">Example link</a>';

  const blocksFromHTML = convertFromHTML(sampleMarkup);
  const state = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );

  console.log("state :>> ", state);

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  //   const [editorState, setEditorState] = useState(state);
  const [rawHTML, setRawHTML] = useState("");

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    setRawHTML(getHTMLFromDraft(editorState));
  };

  const getHTMLFromDraft = (draftText) => {
    // const currentState = draftText.getCurrentContent()
    // const rawState = convertToRaw(currentState);
    // const html = draftToHtml(rawState);
    return draftToHtml(convertToRaw(draftText.getCurrentContent()));
  };

  const createPost = () => {
    handleCreatePost(rawHTML);
  };

  const handleImageUpload = (file) => {
    if (!file) {
      return Promise.reject();
    }

    if (file.size > 5000_000) {
      return Promise.reject();
    }

    console.log("file :>> ", file);
    return Promise.reject();
  };

  const myBlockStyleFn = () => {};

  return (
    <>
      <div>
        <Editor
          editorState={editorState}
          toolbarClassName="toolbar-class"
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          onEditorStateChange={onEditorStateChange}
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            image: {
              uploadCallback: handleImageUpload,
              previewImage: true,
              alt: { present: true, mandatory: false },
              inputAccept: "image/jpeg,image/jpg,image/png",
            },
          }}
          editorStyle={{ border: "1px solid", height: '400px' }}
          //   blockStyleFn={myBlockStyleFn}
        />
      </div>

      <button onClick={createPost}>Create Post</button>
    </>
  );
};

export default TextEditorHooks;
