import { SignIn, SignedIn, SignedOut } from "@clerk/nextjs";

export default function Auth() {
  return (
    <div className="p-10 text-center">
      <SignedOut><SignIn /></SignedOut>
      <SignedIn><p>Welcome to BMG Quiz!</p></SignedIn>
    </div>
  );
}
