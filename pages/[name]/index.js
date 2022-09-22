import prisma from "lib/prisma";
import { getUserTweets, getReplies } from "lib/data.js";
import Tweets from "components/Tweets";
import { useSession } from "next-auth/react";

export default function UserProfile({ name, tweets }) {
  const { data: session, status } = useSession();

  return  (
    <>
      <p className="text-center p-5">User profile of {name}</p>
      <Tweets tweets={tweets} />
    </>
  );
}

export async function getServerSideProps({ params }) {
  const take = 3;
  let tweets = await getUserTweets(params.name, prisma);

  tweets = await Promise.all(
    tweets.map(async (tweet) => {
      let replies = await getReplies(tweet.id, prisma);
      tweet.replies = replies.length;
      return tweet;
    })
  );
  //console.log(tweets)
  tweets = JSON.parse(JSON.stringify(tweets));

  return {
    props: {
      name: params.name,
      tweets,
    },
  };
}
