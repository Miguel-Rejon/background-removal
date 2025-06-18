// Módulos
const { removeBackground } = require("@imgly/background-removal-node");
const fs = require("fs");

// Funcion para eliminar el fondo
async function removeImageBackground(imgSource) {
  try {
    // Eliminando el fondo
    const blob = await removeBackground(imgSource);

    // Conversión a buffer
    const buffer = Buffer.from(await blob.arrayBuffer());

    // Generando la dataURL
    const dataURL = `data:image/png;base64,${buffer.toString("base64")}`;

    // Retorno de la data
    return dataURL;
  } catch (error) {
    throw new Error("Error removing background: " + error);
  }
}

// Ejemplo
async function main() {
  try {
    // Ruta a la imagen
    const imgSource = "img/IMG_0436.jpg";

    // Removiendo el fondo
    const resultDataURL = await removeImageBackground(imgSource);

    // Creacion de la nueva imagen
    fs.writeFileSync("output.png", resultDataURL.split(";base64,").pop(), {
      encoding: "base64",
    });

    console.log("Background removed.");
  } catch (error) {
    console.error("Error:", error.message);
  }
}

main();
