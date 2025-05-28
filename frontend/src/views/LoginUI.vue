<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
    <div class="bg-white shadow-md rounded-2xl p-8 max-w-md w-full text-center">
      <h2 class="text-2xl font-bold mb-6 text-gray-800">
        Accedi a WeSport
      </h2>
      <button
        @click="loginWithGoogle"
        class="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full w-full transition duration-200"
      >
        <svg class="w-5 h-5" viewBox="0 0 48 48">
          <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.8 32.3 29.4 35 24 35c-6.1 0-11-4.9-11-11s4.9-11 11-11c2.9 0 5.5 1.1 7.5 2.9l5.7-5.7C33.3 6.5 28.9 5 24 5 12.4 5 3 14.4 3 26s9.4 21 21 21 21-9.4 21-21c0-1.9-.2-3.7-.4-5.5z"/>
          <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.4 16.1 18.9 13 24 13c2.9 0 5.5 1.1 7.5 2.9l5.7-5.7C33.3 6.5 28.9 5 24 5 15.2 5 7.7 10.1 6.3 14.7z"/>
          <path fill="#4CAF50" d="M24 47c5.4 0 10.4-1.8 14.3-4.9l-6.6-5.4C29.9 38.3 27 39 24 39c-5.3 0-9.7-3.3-11.3-7.9l-6.7 5.1C9.8 42.3 16.4 47 24 47z"/>
          <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.5 3.7-4.8 6.2-8.8 6.2-5.3 0-9.7-4.3-9.7-9.7s4.3-9.7 9.7-9.7c2.6 0 4.9 1 6.6 2.6l6.1-6.1C36.3 8.4 30.5 6 24 6c-8.3 0-15.3 5.3-18 12.6l6.7 5.1C14.3 19.4 18.8 16 24 16c4.7 0 8.6 3.4 9.7 7.8h-9.7v8h19c.1-.7.3-1.4.3-2.1 0-.7-.1-1.3-.3-2z"/>
        </svg>
        <span>Accedi con Google</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  methods: {
    loginWithGoogle() {
      window.location.href = 'https://accounts.google.com/o/oauth2/v2/auth?...'; // Inserisci il tuo client ID qui
    }
  }
}
</script>
