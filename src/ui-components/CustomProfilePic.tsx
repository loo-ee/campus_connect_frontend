import React from "react";
import * as Avatar from "@radix-ui/react-avatar";

export default function CustomProfilePic({ imgSrc }: { imgSrc: string }) {
  return (
    <div className="flex gap-5">
      <Avatar.Root className="bg-blackA3 inline-flex h-[65px] w-[65px] m-2 select-none items-center justify-center overflow-hidden rounded-full align-middle shadow-sm shadow-black">
        <Avatar.Image
          className="h-full w-full rounded-[inherit] object-cover"
          src={imgSrc}
          alt="profile picture"
        />
        <Avatar.Fallback
          className="text-violet11 leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium"
          delayMs={600}
        >
          Avatar
        </Avatar.Fallback>
      </Avatar.Root>
    </div>
  );
}
