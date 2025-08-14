// logica.js


const fotos = [
    {
      ruta: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&h=450&fit=crop&q=80',
      titulo: 'Paisaje montañoso durante el amanecer'
    },
    {
      ruta: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=700&h=450&fit=crop&q=80',
      titulo: 'Sendero serpenteante entre árboles frondosos'
    },
    // Agrega las demás aquí...
  ];
  
  
  let pos = 0;
  
  
  const imgEl = document.getElementById('fotoActiva');
  const descEl = document.getElementById('descripcionFoto');
  const numEl = document.getElementById('numeracionActual');
  const totalEl = document.getElementById('totalFotografias');
  const btnPrev = document.getElementById('botonRetroceder');
  const btnNext = document.getElementById('botonAvanzar');
  
  
  function mostrar() {
    imgEl.src = fotos[pos].ruta;
    imgEl.alt = fotos[pos].titulo;
    descEl.textContent = fotos[pos].titulo;
  
    numEl.textContent = `Foto ${pos + 1}`;
    totalEl.textContent = `Total: ${fotos.length}`;
  }
  
  
  btnPrev.onclick = function() {
    pos = pos > 0 ? pos - 1 : fotos.length - 1;
    mostrar();
  }
  
  btnNext.onclick = function() {
    pos = pos < fotos.length - 1 ? pos + 1 : 0;
    mostrar();
  }
  
  
  document.addEventListener('DOMContentLoaded', mostrar);
  