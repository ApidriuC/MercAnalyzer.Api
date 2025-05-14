import scrapear from './index';

// Puedes usar argumentos desde la consola: node test.js "monitor gamer" 5
const palabra = process.argv[2] || 'mouse gamer';
const cantidad = parseInt(process.argv[3], 10) || 3;

(async () => {
  try {
    const resultados = await scrapear(palabra, cantidad);
    console.log(`📦 ${resultados.length} producto(s) encontrados para: "${palabra}"`);
    console.log(JSON.stringify(resultados, null, 2));
  } catch (error) {
    console.error("❌ Error al ejecutar el scraper:", error);
  }
})();
