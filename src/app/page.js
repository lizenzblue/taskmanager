import Image from "next/image";

import SignInComponent from "./signin/page";
import SignUpComponent from "./signup/page";

export default function Home() {
  return (
    <div>
      <SignUpComponent />
    </div>
  );
}
