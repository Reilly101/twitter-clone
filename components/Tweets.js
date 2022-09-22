import Tweet from "components/Tweet";
import { Provider } from "@lyket/react";

export default function Tweets({ tweets, nolink }) {
  console.log({tweets})
  if (!tweets) return null;
 
  return (
    <Provider apiKey="pt_2168451692b407257cabf3c8714cec">
      {tweets.map((tweet, index) => (
        <Tweet key={index} tweet={tweet} nolink={nolink} />
      ))}
    </Provider>
  );
}
