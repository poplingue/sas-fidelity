import Link from "next/link";

export default function OwnerHome() {
    return (
        <>
            <h1>Hello owner</h1>
            <Link href="/scan">scanner</Link>
            <Link href="/fidelity">ajouter un·e fidèle</Link>
            <Link href="/loyal">les fidèles</Link>
        </>
    )
}
