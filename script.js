const rashaImage = document.getElementById('rashaImage')
const rashaFeeling = document.getElementById("rashaFeeling")

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(async () => {
  const randomImageNumber = Math.floor(Math.random() * 56) + 1;
  const imageName = `Image_${randomImageNumber.toString().padStart(3, '0')}`;
  rashaImage.src= `/images/${imageName}.jpg`;
  const detections = await faceapi.detectAllFaces(rashaImage, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
  const expression = getDominantExpression(detections);
  const expressionText = document.createElement('div');
  expressionText.id = 'expression-text';
  if (expression === "happy")
    expressionText.textContent = `رشروشة اسا سعيدة`;
  expressionText.textContent = `رشروشة اسا حزينة`;
  document.body.append(expressionText);
})

function getDominantExpression(detections) {
  let expressions = detections.map((detection) => detection.expressions);
  let max = -Infinity;
  let dominantExpression;
  for (const expression of expressions) {
    for (const [key, value] of Object.entries(expression)) {
      if (value > max) {
        max = value;
        dominantExpression = key;
      }
    }
  }
  return dominantExpression;
}
