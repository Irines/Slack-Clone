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
            <RowElementColumnOrientation key={index}>
              <img src="/images/File.png" className="png" alt="file" />
              <a href={file.url} target="_blank" rel="noopener noreferrer">
                {file.name}
              </a>
            </RowElementColumnOrientation>
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
  min-height: 180px;
  min-width: 200px;
  margin-right: 2em;
  margin-bottom: 2em;
  > img {
    max-width: 100%;
    max-height: 100%;
  }
  > a {
    font-size: 14px;
  }
  > .png {
    width: 50%;
  }
`;

const RowElementColumnOrientation = styled.div`
    flex-grow: 0;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 20%;
    min-height: 180px;
    min-width: 200px;
    margin-right: 2em;
    margin-bottom: 2em;
    > img {
    max-width: 100%;
    max-height: 100%;
    }
    > a {
    font-size: 14px;
    }
    > .png {
    width: 50%;
    }
`;