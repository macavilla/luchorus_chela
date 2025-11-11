let mic;
let fft;
let filter;
let centroidValues = [];

function setup() {
  createCanvas(800, 600);
  mic = new p5.AudioIn();
  mic.start();

  // Insert a high-pass filter so the analyser reads the filtered signal
  // without routing the raw mic stream directly to the master output.
  filter = new p5.HighPass();
  filter.freq(100);
  filter.res(0);
  mic.connect(filter);

  fft = new p5.FFT();
  fft.setInput(filter);
}

function draw() {
  background(0);
  let spectrum = fft.analyze();

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
