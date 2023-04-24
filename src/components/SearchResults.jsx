import React from "react";
import { useLocation } from "react-router";
import styled from "styled-components";
import { db } from "../firebase";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { enterRoom } from "../features/appSlice";
import { useDispatch } from "react-redux";
import { getDate, getTime } from "../utils/timeFormat";
import { hasContent } from "../utils/string";

function SearchResults() {
  const location = useLocation();
  const dispatch = useDispatch();
  const searchString = location.state.search || "";
  const [dataFromDB, setDataFromDB] = useState([]);
  const [chatIdList, setChatIdList] = useState([]);

  useEffect(() => {
    setDataFromDB([]);
    if (searchString && hasContent(searchString)) {
      getAllRoomsIds();
    }
  }, [searchString]);

  useEffect(() => {
    getAllMessages();
  }, [chatIdList]);

  const getAllRoomsIds = async () => {
    try {
      const parentCollection = await db.collection("rooms").get();
      let idList = [];
      parentCollection.forEach((doc) =>
        idList.push({ chatId: doc.id, chatName: doc.data().name })
      );
      setChatIdList(idList);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllMessages = async () => {
    try {
      const parentCollectionRef = db.collection("rooms");
      chatIdList.forEach((chatDoc) => {
        getNestedCollection(chatDoc, parentCollectionRef);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getNestedCollection = async (chatDoc, parentCollectionRef) => {
    const nestedCollectionRef = parentCollectionRef
      .doc(chatDoc.chatId)
      .collection("messages");

    const querySnapshot = await nestedCollectionRef.get();

    let data = [];
    querySnapshot.forEach((doc) => {
      if (includesSearchString(doc.data().message)) {
        data.push({ ...doc.data(), ...chatDoc });
      }
    });
    setDataFromDB((prevData) => [...prevData, ...data]);
  };

  const includesSearchString = (message) => {
    return message.toLowerCase().includes(searchString.toLowerCase());
  };

  const SelectChannel = (id) => {
    if (id) {
      dispatch(enterRoom({ roomId: id }));
    }
  };

  return (
    <SearchContainer>
      <SearchHeader>
        <h4>{`Search results for '${searchString}'`}</h4>
      </SearchHeader>
      {dataFromDB.length ? (
        dataFromDB.map((result) => {
          const { message, timestamp, user, userImage, chatName, chatId } =
            result;
          return (
            <Link to={`/`} key={chatId + message}>
              <ResultsContainer
                onClick={() => SelectChannel(chatId)}
                key={chatId + message}
              >
                <h4>
                  #{chatName} - <span>{getDate(timestamp)}</span>
                </h4>
                <MessageContainer>
                  <img src={userImage} alt="user image" />
                  <MessageInfo>
                    <h4>
                      {user} <span>{getTime(timestamp)}</span>
                    </h4>
                    <p>{message}</p>
                  </MessageInfo>
                </MessageContainer>
              </ResultsContainer>
            </Link>
          );
        })
      ) : (
        <NoResults>
          <h4>No results were found</h4>
          <h4 className="light-text">You may want to try using different keywords, checking for typos or adjusting your filters.</h4>
        </NoResults>
      )}
    </SearchContainer>
  );
}

export default SearchResults;

const NoResults = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 200px;
  width: 400px;
  margin-left: calc(50% - 200px);
  margin-top: 100px;
  align-self: center;
  align-content: center;
  border-radius: 8px;
  border: 1px solid lightgrey;
  > h4 {
    padding: 5%;
    border-radius: 8px;
    color: var(--dark);
    font-weight: 600;
  }
  > .light-text {
    padding-top: 0;
    color: var(--medium-grey);
    font-weight: 600;
    /* font-size: 13px; */
  }
`;

const SearchContainer = styled.div`
  flex: 0.7;
  overflow-y: scroll;
  flex-grow: 1;
  margin-top: 60px;
  width: 100%;
  height: 100%;
  margin-bottom: 90px;
`;

const SearchHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid lightgrey;
  > h4 {
    color: var(--dark);
    font-weight: 600;
  }
`;

const ResultsContainer = styled.div`
  margin: 20px;
  padding: 8px;
  border: 1px solid lightgrey;
  border-radius: 8px;
  > h4 {
    color: var(--medium-grey);
    font-weight: 600;
    font-size: 13px;
  }
  > h4 > span {
    color: gray;
    font-weight: 300;
    margin-left: 4px;
    font-size: 12px;
  }
`;

const MessageContainer = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 5px;

  > img {
    height: 50px;
    border-radius: 8px;
  }
`;

const MessageInfo = styled.div`
  padding-left: 10px;
  min-height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  > h4 {
    color: var(--medium-grey);
    font-weight: 600;
    margin-bottom: 10px;
  }

  > h4 > span {
    color: gray;
    font-weight: 300;
    margin-left: 4px;
    font-size: 12px;
  }

  > p {
    color: #616061;
    font-weight: 400;
  }
`;
