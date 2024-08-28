import { Editor } from "@tinymce/tinymce-react";
import PropTypes from "prop-types";

const TinyMCEEditor = ({ initialValue, onChange }) => {
  const handleEditorChange = (content, editor) => {
    onChange(content);
  };

  return (
    <Editor
      initialValue={initialValue}
      init={{
        height: 500,
        menubar: false,
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "preview",
          "help",
          "wordcount",
        ],
        toolbar:
          "undo redo | blocks | " +
          "bold italic forecolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "removeformat | help",
        content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        // Specify the path to your self-hosted TinyMCE
        base_url: "/tinymce",
        license_key: "gpl",
      }}
      onEditorChange={handleEditorChange}
    />
  );
};

TinyMCEEditor.propTypes = {
  initialValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TinyMCEEditor;
