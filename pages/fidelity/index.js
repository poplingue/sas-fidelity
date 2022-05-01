import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Fidelity() {
    const [email, setEmail] = useState('');
    const router = useRouter();

    const send = () => {
        localStorage.setItem('fidelity-email', email);
        router.push(`/fidelity/email-sent`);
    };

    return <section>
        <input type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)}/>
        <button onClick={send}>devenir fidèle</button>
    </section>;
}
