let input = document.getElementById("input");
let btn = document.getElementById("btn-barcode-generator");
let downloadBtn = document.getElementById("download");

btn.addEventListener("click", () => {
  if (!input.value) {
    alert("Please enter a value for the barcode.");
    return;
  }

  // Generate the barcode using JsBarcode
  JsBarcode("#barcode", input.value, {
    format: "code128",
    displayValue: true,
    fontSize: 24,
    lineColor: "#000",
  });

  // Convert the SVG barcode to an image for download
  const svg = document.getElementById("barcode");
  const svgData = new XMLSerializer().serializeToString(svg);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const img = new Image();
  const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);

  img.onload = () => {
    // Set canvas dimensions to the SVG's width and height
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    // Set the download link with the generated image data
    const pngFile = canvas.toDataURL("image/png");
    downloadBtn.href = pngFile;
    downloadBtn.download = `${input.value}_barcode.png`;
    downloadBtn.classList.remove("hide");
    URL.revokeObjectURL(url);
  };

  img.src = url;
});

window.onload = () => {
  input.value = "";
  downloadBtn.classList.add("hide");
};
