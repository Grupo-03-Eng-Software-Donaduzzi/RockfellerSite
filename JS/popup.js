function mostrarPopup() {
      if (!sessionStorage.getItem("popupMostrado")) {
        setTimeout(() => {
          document.getElementById("popup").style.display = "flex";
          sessionStorage.setItem("popupMostrado", "true");
        }, 8000); // mostra após 8 segundos
      }
    }

    function fecharPopup() {
      document.getElementById("popup").style.display = "none";
    }

    window.onload = mostrarPopup;