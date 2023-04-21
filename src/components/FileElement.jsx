import React from "react";
import styled from "styled-components";

const FileElement = ({ fileList }) => {
  return (
    <Row>
      {fileList.map((file, index) => {
        console.log("file", file);
        if (file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
          // Render image file
          return (
            <RowElement key={index}>
              <img src={file.url} alt={file.name} />
            </RowElement>
          );
        } else if (file.name.match(/\.(doc|docx|pdf|txt)$/)) {
          // Render document file
          return (
            <RowElement key={index}>
              <a href={file.url} target="_blank" rel="noopener noreferrer">
                {file.name}
              </a>
            </RowElement>
          );
        } else {
          // Render unknown file type
          return (
            <RowElement key={index}>
              <span>{file.name}</span>
            </RowElement>
          );
        }
      })}
    </Row>
  );
};

export default FileElement;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-bottom: 20px;
`;

const RowElement = styled.div`
  flex-grow: 0;
  width: 20%;
  height: 180px;
  margin-right: 20px;
  margin-bottom: 20px;
  > img {
    max-width: 100%;
    max-height: 100%;
  }
`;
