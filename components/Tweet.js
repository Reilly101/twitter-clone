import timeago from "lib/timeago";
import { loadGetInitialProps } from "next/dist/shared/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import LikeButton from "./Likebutton";
import Router from "next/router";

export default function Tweet({ tweet, nolink }) {
  console.log(tweet);
  return (
    <div className="mb-4">
      <div className="flex flex-shrink-0 p-4 pb-0">
        <div className="flex-shrink-0 block group">
          <div className="flex items-center">
            <div >
              {tweet.author.image && (
                <Image
                  className="rounded-full"
                  src={tweet.author.image}
                  alt=""
                  width="40"
                  height="40"
                />
              )}
            </div>
            <div className="ml-3 -mt-6">
              <div className="">
                <Link href={`/${tweet.author.name}`}>
                  <a>
                    <span className="text-base font-medium leading-6 color-primary hover:underline">
                      {tweet.author.name}
                    </span>
                  </a>
                </Link>

                <span className="pl-1 text-sm font-light leading-5 color-dimmed">
                  {nolink ? (
                    <span>{timeago.format(new Date(tweet.createdAt))}</span>
                  ) : (
                    <Link href={`/${tweet.author.name}/status/${tweet.id}`}>
                      <a className="hover:underline">
                        {timeago.format(new Date(tweet.createdAt))}
                      </a>
                    </Link>
                  )}
               
                 <div className="m-2">
                    <LikeButton
                      tweetId={tweet.id}
                    />
                  </div>
                  {/* // <Link href={`/${tweet.author.name}/status/${tweet.id}`}>
                  //   <a className='hover:underline'>
                  //     {timeago.format(new Date(tweet.createdAt))}
                  //   </a>
                  
                  // </Link> */}
                </span>
              </div>
            </div>
        
        </div>
      </div>
      <div className="pl-16 -mt-6">
        <p className="flex-shrink pl-1 pr-2 text-base font-normal color-primary width-auto">
          {tweet.content}
        </p>
        ({tweet.replies})
      </div>
    </div>
    <div className='flex-1 py-2 m-2 text-center'>
          <a
            href='#'
            className='flex items-center w-12 px-3 py-2 mt-1 text-base font-medium leading-6 text-gray-500 rounded-full hover:bg-color-accent-hover hover:color-accent-hover'
            onClick={async () => {
              const res = await fetch('/api/tweet', {
                body: JSON.stringify({
                  id: tweet.id,
                }),
                headers: {
                  'Content-Type': 'application/json',
                },
                method: 'DELETE',
              })

              if (res.status === 401) {
                alert('Unauthorized')
              }
              if (res.status === 200) {
                router.push('/home')
              }
            }}
          >
            delete
          </a>
        </div>
</div>
  );
}
