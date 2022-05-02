export default function ClientProfile({loyal}){
    return   <section>
        <h2>Client profile</h2>
        <div>Email : {loyal.email}</div>
        <div>Passages en caisse : {loyal.cash}</div>
        <div>Date de création : {loyal.createdAt}</div>
        <div>Cadeaux reçus : {loyal.present}</div>
    </section>
}
