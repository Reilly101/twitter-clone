import { useSession } from "next-auth/react";
import NewTweet from "components/NewTweet";
import Tweets from "components/Tweets";
import prisma from "lib/prisma";
import { getTweets, getReplies } from "lib/data.js";
import { useRouter } from "next/router";
import LoadMore from "components/LoadMore";
import { useState } from "react";
import { Provider } from "@lyket/react";

export default function Home({ initialTweets }) {
  const [tweets, setTweets] = useState(initialTweets);
  const router = useRouter();
  const { data: session, status } = useSession();
  const loading = status === "loading";

  // if(session==null){
  //   return 'not logged in'
  // }

  if (loading) {
    return null;
  }
  if (!session) {
    // router.push("/");
    return null
  }

  if (session && !session.user.name) {
    router.push("/setup");
  }

  return (
    <>
      <NewTweet />
      <Tweets tweets={tweets} nolink={!session.user} Provider={Provider} />
      <LoadMore tweets={tweets} setTweets={setTweets}    />
      {console.log(session)}
   
    </>
  );
}


export async function getServerSideProps() {
  let tweets = await getTweets(prisma, 2);

  //this is a way how to create deep copy
  tweets = JSON.parse(JSON.stringify(tweets));
  tweets = await Promise.all(
    tweets.map(async (tweet) => {
      let replies = await getReplies(tweet.id, prisma);
      tweet.replies = replies.length;
      return tweet;
    })
  );

  return {
    props: {
      initialTweets: tweets,
    },
  };
}
