import React, { useState, useEffect } from "react";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import { fetchAuthSession } from "aws-amplify/auth";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolClientId: "5olt89m31loa21lhnd68q0a1t3",
      userPoolId: "ap-south-1_NDLZEfqd1",
    },
  },
});

const SignIn: React.FC = () => {
  const [accessToken, setAccessToken] = useState<string>("");

  useEffect(() => {
    const getSession = async () => {
      try {
        const session = await fetchAuthSession();
        const token = session.tokens?.idToken?.toString();
        console.log(token);
        if (token) {
          setAccessToken(token);
        }
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };
    getSession();
  }, []);

  return (
    <Authenticator loginMechanisms={["email"]}>
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user?.username}</h1>
          <button onClick={signOut}>Sign out</button>
          {accessToken && <p>Access Token: {accessToken}</p>}
        </main>
      )}
    </Authenticator>
  );
};

export default SignIn;
