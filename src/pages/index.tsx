import { Button } from "antd";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";

import { api } from "~/utils/api";

import "./index.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Colera CRM - Home</title>
      </Head>
      <main>
        <AuthShowcase />
      </main>
    </>
  );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div>
      <p>
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <Button
        onClick={sessionData ? () => void signOut() : () => void signIn()}
        type="primary"
      >
        {sessionData ? "Sign out" : "Sign in"}
      </Button>
    </div>
  );
}
