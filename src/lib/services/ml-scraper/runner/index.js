import path from 'path';
import { PythonShell } from 'python-shell';

function scrapear(palabraClave, cantidad = 3) {
  const scriptPath = path.resolve(process.cwd(), 'src/lib/services/ml-scraper/scraper');
  console.log('MI SCRIPT: ' + scriptPath);

  return new Promise((resolve, reject) => {
    const options = {
      mode: 'text',
      encoding: 'utf8',
      pythonOptions: ['-u'],
      scriptPath: scriptPath,
      args: [palabraClave, cantidad.toString()],
      env: {
        ...process.env,
        PYTHONIOENCODING: 'utf-8' // 👈 fuerza Python a emitir UTF-8
      }
    };

    PythonShell.run('scraper.py', options)
      .then(results => {
        const utf8Text = results.join('');
        const data = JSON.parse(utf8Text);
        resolve(data);
      })
      .catch(err => reject(err));
  });
}

export default scrapear;
