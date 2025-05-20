const BASE_URL = "https://api.wesport.it"; 
const token = localStorage.getItem("token");

function getHeaders() {
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  };
}

// Carica tutti gli annunci
async function caricaAnnunci() {
  try {
    const res = await fetch(`${BASE_URL}/annuncio`, {
      headers: getHeaders()
    });
    if (!res.ok) throw new Error("Errore caricamento annunci");
    const annunci = await res.json();
    mostraAnnunci(annunci);
  } catch (err) {
    console.error(err);
    alert("Errore nel caricamento degli annunci");
  }
}

// Mostra la lista annunci in pagina
function mostraAnnunci(annunci) {
  const container = document.getElementById("listaAnnunci");
  container.innerHTML = "";
  if (!annunci.length) {
    container.innerHTML = "<p>Nessun annuncio trovato.</p>";
    return;
  }

  annunci.forEach(a => {
    const div = document.createElement("div");
    div.className = "annuncio";
    div.innerHTML = `
      <h3>${a.titolo}</h3>
      <p>${a.descrizione}</p>
      <button onclick="iscriviti('${a._id}')">Iscriviti</button>
      <button onclick="disiscriviti('${a._id}')">Disiscriviti</button>
    `;
    container.appendChild(div);
  });
}

// Iscrizione annuncio
async function iscrivitiAnnuncio(idAnnuncio) {
  try {
    const res = await fetch(`${BASE_URL}/${idAnnuncio}/iscritti`, {
      method: "POST",
      headers: getHeaders()
    });
    if (!res.ok) throw new Error("Iscrizione fallita");
    alert("Iscrizione effettuata con successo");
    caricaAnnunci();
  } catch (err) {
    console.error(err);
    alert("Errore nell'iscrizione");
  }
}

// Disiscrizione annuncio
async function disiscrivitiAnnuncio(idAnnuncio) {
  try {
    const res = await fetch(`${BASE_URL}/${idAnnuncio}/iscritti`, {
      method: "DELETE",
      headers: getHeaders()
    });
    if (!res.ok) throw new Error("Disiscrizione fallita");
    alert("Disiscrizione effettuata con successo");
    caricaAnnunci();
  } catch (err) {
    console.error(err);
    alert("Errore nella disiscrizione");
  }
}

// Creazione annuncio
async function creaAnnuncio(event) {
  event.preventDefault();
  const titolo = event.target.titolo.value.trim();
  const descrizione = event.target.descrizione.value.trim();

  if (!titolo || !descrizione) {
    alert("Compila tutti i campi");
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}/annuncio`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ titolo, descrizione })
    });
    if (!res.ok) throw new Error("Creazione annuncio fallita");
    alert("Annuncio creato con successo");
    event.target.reset();
    caricaAnnunci();
  } catch (err) {
    console.error(err);
    alert("Errore nella creazione annuncio");
  }
}

// All'avvio carica gli annunci
window.addEventListener("DOMContentLoaded", () => {
  caricaAnnunci();
});
