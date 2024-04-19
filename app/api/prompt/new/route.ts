import connectToDB from "@utils/database";
import { NextResponse } from "next/server";
import Prompt from "@models/prompt";

export const POST = async (request: Request) => {
  const { userId, prompt, tag } = await request.json();
  const newTag = tag.split("#").join("").split(" ").join("");
  try {
    await connectToDB();
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag: newTag,
    });

    await newPrompt.save();

    return new NextResponse(JSON.stringify(newPrompt), {
      status: 201,
    });
  } catch (error) {
    return new NextResponse("Failed to create a new prompt", { status: 500 });
  }
};
