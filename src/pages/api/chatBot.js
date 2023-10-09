// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectToDatabase } from "../../../lib/mongodb";
export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  if (req.method === "POST") {
    const chatData = await db.collection("chatBot").find({}).toArray();
    for (const key in chatData[0]) {
      if (chatData[0].hasOwnProperty(key)) {
        if (key == req.body.id) {
          chatData[0][key].map((data, i) => {
            if (data.ques === req.body.ques) {
              if (data.check === true) {
                res.status(200).json({
                  title: data.ans,
                  option: {
                    title: "Is your Query Resolved?",
                    option: ["YES", "NO"],
                  },
                  status: 200,
                  check: check,
                  timestamp: Date.now() - 10000,
                  tag: "send",
                });
              } else {
                res.status(200).json({
                  title: data.ans.title,
                  option: data.ans.option,
                  check: data.check,
                  status: 200,
                  timestamp: Date.now() - 10000,
                  tag: "send",
                });
              }
            }
          });
        }
      }
    }
    console.log(chatData, "chatBot");
  }
}
