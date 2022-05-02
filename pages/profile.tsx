import { PrismaClient } from "@prisma/client";
import { GetServerSideProps } from "next";
import { useState } from "react";

export default function Profile({ loyal: profile }) {

  return (
    <section>
      <div>Email : {profile.email}</div>
      <div>Passages en caisse : {profile.cash}</div>
      <div>Date de création : {profile.createdAt}</div>
      <div>Cadeaux reçus : {profile.present}</div>
    </section>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const prisma = new PrismaClient();
  const email = query.email;

  const loyal = await prisma.loyal.findUnique({
    where: { email },
  });

  const newLoyal = {
    ...loyal,
    createdAt: loyal.createdAt.toISOString(),
    updatedAt: loyal.updatedAt.toISOString(),
  };

  return {
    props: { loyal: newLoyal },
  };
};
