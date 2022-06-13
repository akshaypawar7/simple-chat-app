import { initializeApp } from "firebase/app";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseConfig } from "./firebaseConfig";

const fireApp = initializeApp(firebaseConfig);

const auth = getAuth(fireApp);

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
      console.log(result);
    });
  };

  return (
    <div className="signin">
      <button
        style={{
          width: "300px",
          height: "40px",
          backgroundColor: "ForestGreen",
          color: "white",
        }}
        onClick={signInWithGoogle}
      >
        Sign in with Google
      </button>
      <p>
        Do not violate the community guidelines or you will be banned for life!
      </p>
    </div>
  );
}

export { fireApp, auth };
export default SignIn;
