import { createSlice, configureStore } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "chatBot",
  initialState: [
    "Hi Somnath, I'm the Support Assistant.",
    "I am here to help you and will connect you to a customer support agent (through call, chat or email) if I don't have the answer.",
    {
      messages: "How can I help you with?",
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
    },
  ],
  reducers: {},
});
