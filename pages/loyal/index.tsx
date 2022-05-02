import {PrismaClient} from "@prisma/client";
import {GetServerSideProps} from "next";
import Link from "next/link";

export default function All({data}) {

    return (
        <section>
            {data.map((loyal) => {
                return <div key={loyal.email}>
                    <Link href={`/loyal/${loyal.id}`}>{loyal.email}</Link>
                </div>
            })}
            <hr/>
            <Link href="/">Accueil</Link><br/>
        </section>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    const prisma = new PrismaClient();

    const loyals = await prisma.loyal.findMany();
    const data = []

    for (let i = 0; i < loyals.length; i++) {
        const {email, id, cash} = loyals[i];

        data.push({email, cash, id})
    }

    return {
        props: {data},
    };
};
