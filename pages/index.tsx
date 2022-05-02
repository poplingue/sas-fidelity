import {useEffect, useState} from "react";
import Layout from '../components/Layout'
import OwnerHome from "../components/OwnerHome";
import ClientHome from "../components/ClientHome";
import Link from "next/link";

export default function Home() {
    const [fidelityOwner, setFidelityOwner] = useState("");
    const [fidelityEmail, setFidelityEmail] = useState("");
    const [loyal, setLoyal] = useState(null);

    useEffect(() => {
        if (!fidelityOwner) {
            setFidelityOwner(localStorage.getItem("fidelity-owner"));
        }
    }, []);

    useEffect(() => {
        async function getLoyal(email: String) {
            return await fetch('/api/loyal/one', {
                method: 'POST',
                body: JSON.stringify({email})
            })
        }

        if (!fidelityEmail) {
            setFidelityEmail(localStorage.getItem("fidelity-email"));
        }

        if (!loyal) {

            getLoyal(fidelityEmail).then((resp) => {
                resp.json().then((data) => {
                    setLoyal(data);
                })
            });
        }

    }, []);

    return (
        <Layout>
            <Link href="/secret">connection</Link><br/>
            <Link href="/fidelity">ajouter</Link>
            {fidelityOwner === "ok" ? <OwnerHome/> : null}
            {fidelityEmail ? <ClientHome id={loyal?.id}/> : null}
        </Layout>
    );
}
