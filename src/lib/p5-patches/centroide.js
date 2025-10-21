let mic;
let fft;
let centroidValues = [];

function setup() {
  createCanvas(800, 600);
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
}

function draw() {
  background(0);
  let spectrum = fft.analyze();
  let centroid = calculateSpectralCentroid(spectrum);
  if (!isNaN(centroid)) {
    centroidValues.push(centroid);
  }

  // Dibujar el espectro; me hice quilombo JAJA
  noStroke();
  fill(255);
  beginShape();
  for (let i = 0; i < spectrum.length; i++) {
    let x = map(i, 0, spectrum.length, 0, width);
    let y = height - map(spectrum[i], 0, 255, 0, height);
    vertex(x, y);
  }
  endShape();

  // Mostrar el centroide espectrals
  if (!isNaN(centroid.toFixed(2))) {
    fill(255, 0, 0);
    textSize(24);
    text(`Centroide espectral: ${centroid.toFixed(2)}`, 20, 40);
  }
}

function calculateSpectralCentroid(spectrum) {
  let sum = 0;
  let weightedSum = 0;
  for (let i = 0; i < spectrum.length; i++) {
    sum += spectrum[i];
    weightedSum += i * spectrum[i];
  }
  return weightedSum / sum;
}

function keyPressed() {
  if (key === "s" || key === "S") {
    saveCentroidValues();
  }
}

function saveCentroidValues() {
  let csv = "Tiempo,Centroide Espectral\n";
  for (let i = 0; i < centroidValues.length; i++) {
    csv += `${i},${centroidValues[i]}\n`;
  }
  let blob = new Blob([csv], { type: "text/csv" });
  let a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "centroid_values.csv";
  a.click();
}
