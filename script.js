document.addEventListener('DOMContentLoaded', () => {
  const textInput = document.getElementById('textInput');
  const btnClear = document.getElementById('btnClear');
  const btnSample = document.getElementById('btnSample');
  const btnCopy = document.getElementById('btnCopy');
  const toast = document.getElementById('toast');

  const wordCount = document.getElementById('wordCount');
  const charWithSpaces = document.getElementById('charWithSpaces');
  const charNoSpaces = document.getElementById('charNoSpaces');
  const sentenceCount = document.getElementById('sentenceCount');
  const paragraphCount = document.getElementById('paragraphCount');
  const readingTime = document.getElementById('readingTime');

  function updateStatistics() {
    const text = textInput.value;

    // Characters
    const withSpaces = text.length;
    const noSpaces = text.replace(/\s/g, '').length;

    // Words
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).filter(Boolean) : [];
    const countWords = words.length;

    // Sentences
    const sentences = trimmed ? trimmed.split(/[.!?]+(?:\s+|$)/).filter(s => s.trim().length > 0) : [];
    const countSentences = sentences.length;

    // Paragraphs
    const paragraphs = text.split(/\n+/).filter(p => p.trim().length > 0);
    const countParagraphs = paragraphs.length;

    // Reading time (200 words per minute)
    const minutes = countWords > 0 ? (countWords / 200).toFixed(1) : 0;
    const readingTimeStr = minutes < 1 && countWords > 0 ? '< 1 min' : `${minutes} min`;

    wordCount.textContent = countWords.toLocaleString();
    charWithSpaces.textContent = withSpaces.toLocaleString();
    charNoSpaces.textContent = noSpaces.toLocaleString();
    sentenceCount.textContent = countSentences.toLocaleString();
    paragraphCount.textContent = countParagraphs.toLocaleString();
    readingTime.textContent = readingTimeStr;
  }

  function showToast(message) {
    toast.textContent = message;
    toast.style.display = 'block';
    setTimeout(() => {
      toast.style.display = 'none';
    }, 2500);
  }

  textInput.addEventListener('input', updateStatistics);
  textInput.addEventListener('paste', () => setTimeout(updateStatistics, 10));

  btnClear.addEventListener('click', () => {
    textInput.value = '';
    updateStatistics();
    showToast('Text cleared.');
  });

  btnSample.addEventListener('click', () => {
    textInput.value = `Natural language processing allows computers to analyze, understand, and generate human language in a useful way. 

Word counters are essential tools for writers, editors, students, and programmers. By tracking total words, character limits, sentence structures, and estimated reading speeds, authors can calibrate their content effectively. How quickly can an average reader finish reading this sample paragraph? It usually takes less than a minute!`;
    updateStatistics();
    showToast('Sample text loaded.');
  });

  btnCopy.addEventListener('click', () => {
    if (!textInput.value.trim()) {
      showToast('Nothing to copy!');
      return;
    }
    navigator.clipboard.writeText(textInput.value)
      .then(() => showToast('Text copied to clipboard!'))
      .catch(() => {
        textInput.select();
        document.execCommand('copy');
        showToast('Text copied to clipboard!');
      });
  });

  updateStatistics();
});
