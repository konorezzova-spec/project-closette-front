import { forwardPost } from "../../_utils/authProxy";

export async function POST(request: Request) {
  return forwardPost("/auth/register", request);
}