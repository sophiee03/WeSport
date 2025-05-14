document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");
  const profileOutput = document.getElementById("profileOutput");
  const profileButton = document.getElementById("getProfile");

  // Funzione: invia richiesta di registrazione
  registerForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const res = await fetch("http://localhost:3000/registrazioneUtente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ nome, email, password })
      });

      const data = await res.json();

      if (res.status === 201) {
        alert("Registrazione avvenuta con successo!");
        localStorage.setItem("token", data.token); // salva il token JWT se presente
      } else {
        alert("Errore nella registrazione: " + (data.error || "Errore sconosciuto"));
      }
    } catch (error) {
      console.error("Errore durante la registrazione:", error);
      alert("Errore di rete");
    }
  });

  // Funzione: ottieni profilo utente autenticato
  profileButton?.addEventListener("click", async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Token mancante: effettua prima la registrazione.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/profiloUtente", {
        headers: {
          Authorization: "Bearer " + token
        }
      });

      const data = await res.json();

      if (res.ok) {
        profileOutput.textContent = JSON.stringify(data, null, 2);
      } else {
        alert("Errore nel recupero del profilo: " + (data.error || "Errore sconosciuto"));
      }
    } catch (error) {
      console.error("Errore durante il recupero del profilo:", error);
      alert("Errore di rete");
    }
  });
});
