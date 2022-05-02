import {PrismaClient} from "@prisma/client";
import {GetServerSideProps} from "next";
import {useEffect, useState} from "react";
import OwnerProfile from '../../components/OwnerProfile'
import ClientProfile from '../../components/ClientProfile'

export default function Profile({loyal}) {
    const [fidelityOwner, setFidelityOwner] = useState("");

    useEffect(() => {
        if (localStorage && !fidelityOwner) {
            setFidelityOwner(localStorage.getItem("fidelity-owner"));
        }
    }, []);

    return <>{fidelityOwner === 'ok' ? <OwnerProfile loyal={loyal}/> : <ClientProfile loyal={loyal}/>}</>
}

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const prisma = new PrismaClient();

    const loyal = await prisma.loyal.findUnique({
        where: {id: Number(params.id)}
    });

    return {
        props: {
            loyal: {
                ...loyal,
                createdAt: loyal.createdAt.toISOString(),
                updatedAt: loyal.updatedAt.toISOString(),
            }
        },
    };
};
