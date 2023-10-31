import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useState, useEffect, useRef } from "react";
import { BsFillChatLeftTextFill, BsFillSendFill } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import Image from "next/image";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [openChatWindow, setOpenChatWindow] = useState(true);
  const [chatData, setChatData] = useState([]);
  const [messages, setMessages] = useState([]);
  const [disableClick, setDisableClick] = useState(false);
  const [receivedMessageClicked, setReceivedMessageClicked] = useState(false);
  const [receiveMsg, setReceiveMsg] = useState([
    {
      timestamp: Date.now() - 10000,
      title: "Hi Somnath, I'm the Support Assistant.",
      option: [],
      tag: "send",
    },
    {
      timestamp: Date.now() - 10000,
      title:
        "I am here to help you and will connect you to a customer support agent (through call, chat or email) if I don't have the answer.",
      option: [],
      tag: "send",
    },
    {
      title: "How can I help you with?",
      option: [
        {
          id: "batchDate",
          ques: "When will the next batch start?",
        },
        {
          id: "fee",
          ques: "What is the course fee of data science course?",
        },
        {
          id: "projects",
          ques: "How many project is there in this course?",
        },
        {
          id: "experience",
          ques: "What is real work experience? How it will help me?",
        },
        {
          id: "enroll",
          ques: "How to enroll in this course?",
        },
        {
          id: "Other",
          ques: "Other",
        },
        {
          id: "Specialist",
          ques: "Connect with our specialist",
        },
      ],
      timestamp: Date.now() - 10000,
      tag: "send",
    },
  ]);
  const [input, setInput] = useState("");
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  const chatContainerRef = useRef(null);

  const shouldAutoScroll = useRef(true);

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;

    // If the user manually scrolls up, disable auto-scroll
    if (scrollTop + clientHeight < scrollHeight) {
      shouldAutoScroll.current = false;
    } else {
      shouldAutoScroll.current = true;
    }
  };
  useEffect(() => {
    // ... other code ...

    if (chatContainerRef.current) {
      chatContainerRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (chatContainerRef.current) {
        chatContainerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);
  // Use the useEffect hook to scroll to the latest message whenever messages change
  useEffect(() => {
    // console.log(messages, "inside UseEffect");
    const sortedMessages = [...messages].sort(
      (a, b) => a.timestamp - b.timestamp
    );
    const sortedReceiveMsg = [...receiveMsg].sort(
      (a, b) => a.timestamp - b.timestamp
    );

    const combinedChatData = [...sortedMessages, ...sortedReceiveMsg];

    combinedChatData.sort((a, b) => a.timestamp - b.timestamp);
    // console.log(combinedChatData, "combined");
    setChatData(combinedChatData);
  }, [receiveMsg, messages]);
  useEffect(() => {
    if (shouldAutoScroll.current) {
      scrollToLatestMessage();
    }
  }, [chatData]);
  const scrollToLatestMessage = () => {
    if (shouldAutoScroll.current && chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };
  const handleReceivedMessageClick = () => {
    setReceivedMessageClicked(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add user message to the chat
    setMessages([...messages, { text: input, type: "user", tag: "receive" }]);
    setInput("");
    // Implement your chatbot logic here and add responses to the chat
    // Example: Call a function or API to get chatbot responses
  };

  const sendOption = async (msg, id, msgLength) => {
    // if (disableClick) {
    //   return; // Disable the onClick event
    // }
    // Handle the click event here
    // console.log("Div clicked!");
    // Disable the onClick event for this div after it's clicked
    // if (chatData.length === msgLength + 1) {
    //   setDisableClick(true);
    // }
    // setDisableClick(false);
    // console.log({ text: msg, type: "user" });

    // console.log(messages);
    try {
      setMessages([
        ...messages,
        { title: msg, id: id, tag: "receive", timestamp: Date.now() - 10000 },
      ]);

      const data = await fetch("/api/chatBot", {
        method: "POST",
        body: JSON.stringify({
          id: id,
          ques: msg,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((t) => t.json());

      if (data.status === 200) {
        // console.log(data);
        setReceiveMsg((prevMessages) => [...prevMessages, data]);
        // setDisableClick(false);
      }
    } catch (error) {}
  };

  return (
    <>
      <Head>
        <title>Chat-Bot</title>
        <meta name="description" content="Chat Bot" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.description}>
          <p>Get started by clicking the chat icon</p>
          <div>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              By SOMNATH
            </a>
          </div>
        </div>

        <div className={styles.center}>CHAT BOT</div>
        <div className={styles.chatBot} onClick={() => setOpenChatWindow(true)}>
          <BsFillChatLeftTextFill className={styles.icon} />
        </div>
        {openChatWindow ? (
          <div className={styles.chatWindow}>
            <div className={styles.chatbotWrapper}>
              <div className={styles.headerChat}>
                <p
                  className={styles.close}
                  onClick={() => setOpenChatWindow(false)}
                >
                  <AiFillCloseCircle style={{ fontSize: "20px" }} />
                </p>
                <div className={styles.headLeft}>
                  <MdOutlineKeyboardArrowLeft className={styles.backIcon} />
                  <div className="imgWrapper">
                    <Image
                      src="/images/robot-profile.png"
                      alt="robot"
                      height={30}
                      width={30}
                    />
                  </div>
                </div>
                <div className={styles.headRight}>
                  <p>Noob Robot</p>
                  <span>online</span>
                </div>
              </div>
              <div
                className={styles.chatBody}
                ref={chatContainerRef}
                onScroll={handleScroll}
              >
                {chatData.map((data, i) => {
                  // console.log(data, "data..");
                  return (
                    <div
                      className={
                        data.tag === "receive"
                          ? styles.sentMsg
                          : styles.receiveMsg
                      }
                      key={i}
                    >
                      <div className={styles.optionDiv}>
                        <p>{data.title}</p>

                        {data.option && data.option.length > 0
                          ? data.option.map((optionData, j) => {
                              // console.log(
                              //   chatData.length === i + 1,
                              //   chatData.length,
                              //   i + 1,
                              //   "check"
                              // );
                              return (
                                <span
                                  className={
                                    chatData.length === i + 1
                                      ? styles.options
                                      : styles.nOptions
                                  }
                                  key={j}
                                  onClick={() => {
                                    chatData.length === i + 1
                                      ? sendOption(
                                          optionData.ques,
                                          optionData.id,
                                          i
                                        )
                                      : null;
                                  }}
                                >
                                  {optionData.ques}
                                </span>
                              );
                            })
                          : ""}

                        {data.check === true ? (
                          <div className={styles.queryMsg}>
                            <p>{data.option.title}</p>
                            {/* {console.log(data.option, "283")} */}
                            {data.option.option.map((dataS, id) => {
                              console.log(data);
                              return (
                                <span
                                  className={
                                    chatData.length === i + 1
                                      ? styles.options
                                      : styles.nOptions
                                  }
                                  key={id}
                                  onClick={() => {
                                    chatData.length === i + 1
                                      ? sendOption(dataS, data.option.id)
                                      : null;
                                  }}
                                >
                                  {dataS}
                                </span>
                              );
                            })}
                          </div>
                        ) : (
                          ""
                        )}
                        {data.check === "end" ? <p>{data.title}</p> : ""}
                      </div>
                    </div>
                  );
                })}

                {/* <div className={styles.receiveMsg}>
                  {receiveMsg.map((data, i) => {
                    return typeof data === "string" ? (
                      <span key={i}>{data}</span>
                    ) : (
                      <div className={styles.optionDiv} key={i}>
                        <p>{data.title}</p>
                        {data.option.map((optionData, j) => {
                          return (
                            <span
                              className={
                                disableClick ? styles.nOptions : styles.options
                              }
                              key={j}
                              onClick={() => {
                                sendOption(optionData.ques, optionData.id);
                              }}
                            >
                              {optionData.ques}
                            </span>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>

                // <div className={styles.sentMsg}>
                //   {messages.map((data, i) => {
                //     // console.log(data, "data.text");
                //     return (
                //       <span key={i} name="span">
                //         {data.text}
                //       </span>
                //     );
                //   })}
                // </div> */}
              </div>

              {/* Input field for typing.. */}
              <div className={styles.chatFooter}>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={input}
                    onChange={handleInputChange}
                  />
                  <button className={styles.btn} type="submit">
                    <BsFillSendFill />
                  </button>
                </form>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </>
  );
}
