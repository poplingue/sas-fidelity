import {useRouter} from "next/router";
import {useState} from "react";

export default function Secret() {
    const [secret, setSecret] = useState("");
    const router = useRouter();

    const send = async (e) => {
        e.preventDefault();

        const res = await fetch('/api/owner/check', {
            method: 'POST',
            body: JSON.stringify({secret})
        })

        const data = await res.json()
        localStorage.setItem("fidelity-owner", data.response);

        router.push('/');
    };

    const content = () => {

        return (
            <form>
                <input
                    type="text"
                    placeholder="secret"
                    onChange={(e) => setSecret(e.target.value)}
                />
                <button onClick={send}>accéder</button>
            </form>
        );

    };

    return <section>{content()}</section>;
}
