import requests
from bs4 import BeautifulSoup
import chardet
import json
import sys
from ftfy import fix_text

def obtener_detalles_e_imagen(url):
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124 Safari/537.36"
    }
    response = requests.get(url, headers=headers)
    raw_content = response.content
    detected_encoding = chardet.detect(raw_content)['encoding']
    soup = BeautifulSoup(raw_content.decode(detected_encoding, errors='replace'), "html.parser")

    # Detalles
    detalles = []
    lista_simple = soup.find("ul", class_="ui-vpp-highlighted-specs__features-list")
    if lista_simple:
        items = lista_simple.find_all("li")
        detalles.extend([fix_text(li.text.strip()) for li in items])

    columnas = soup.find_all("p", class_="ui-pdp-family--REGULAR ui-vpp-highlighted-specs__key-value__labels__key-value")
    for par in columnas:
        detalles.append(fix_text(par.text.strip()))

    descripcion = "\n".join(detalles) if detalles else "No hay detalles disponibles."

    # Imagen principal desde producto
    img_tag = soup.find("img", class_="ui-pdp-gallery__figure__image")
    imagen = img_tag["src"] if img_tag else "Sin imagen"

    return descripcion, imagen

def scrapear_productos(palabra_clave, cantidad=3):
    url = f"https://listado.mercadolibre.com.co/{palabra_clave}"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124 Safari/537.36"
    }
    response = requests.get(url, headers=headers)
    raw_content = response.content
    detected_encoding = chardet.detect(raw_content)['encoding']
    soup = BeautifulSoup(raw_content.decode(detected_encoding, errors='replace'), "html.parser")

    items = soup.find_all("div", class_="ui-search-result__wrapper")
    productos = []

    for item in items:
        if len(productos) >= cantidad:
            break

        title_tag = item.find("a", class_="poly-component__title")
        title = fix_text(title_tag.text.strip()) if title_tag else "Sin título"
        link = title_tag["href"] if title_tag else "Sin enlace"
        price_tag = item.find("span", class_="andes-money-amount__fraction")
        raw_price = price_tag.text.strip().replace(".", "") if price_tag else "0"
        try:
            price = int(raw_price)
        except:
            price = 0

        descripcion, imagen = obtener_detalles_e_imagen(link)

        if imagen != "Sin imagen":
            productos.append({
                "nombre": title,
                "precio": price,
                "imagen": imagen,
                "descripcion": descripcion,
                "link": link
            })

    return productos

if __name__ == "__main__":
    palabra = sys.argv[1]
    cantidad = int(sys.argv[2]) if len(sys.argv) > 2 else 3
    resultado = scrapear_productos(palabra, cantidad)
    sys.stdout.buffer.write(json.dumps(resultado, ensure_ascii=False).encode('utf-8'))
