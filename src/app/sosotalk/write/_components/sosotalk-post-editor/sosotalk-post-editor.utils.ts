const HTML_TAG_PATTERN = /<\/?[a-z][\s\S]*>/i;

export const normalizePlainText = (text: string) =>
  text.replace(/\u00A0/g, ' ').replace(/\n{3,}/g, '\n\n');

export const isRichTextHtml = (content: string) => HTML_TAG_PATTERN.test(content);

export const toInitialHtml = (content: string) => {
  if (!content.trim()) {
    return '';
  }

  if (isRichTextHtml(content)) {
    return content;
  }

  return content
    .split('\n')
    .map((line) => {
      if (!line.trim()) {
        return '<p><br></p>';
      }

      return `<p>${line}</p>`;
    })
    .join('');
};

const stripHtmlToPlainTextFallback = (html: string) =>
  normalizePlainText(
    html
      .replace(/<(\/p|\/div|\/li|br)\s*>/gi, '\n')
      .replace(/<li\b[^>]*>/gi, '• ')
      .replace(/<[^>]+>/g, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  );

export const extractTextFromHtml = (html: string) => {
  if (!html.trim()) {
    return '';
  }

  if (typeof window === 'undefined') {
    return stripHtmlToPlainTextFallback(html);
  }

  const container = window.document.createElement('div');
  container.innerHTML = html;

  return normalizePlainText(container.innerText ?? container.textContent ?? '');
};

export const toInitialText = (content: string) => {
  if (!content.trim()) {
    return '';
  }

  return isRichTextHtml(content) ? extractTextFromHtml(content) : normalizePlainText(content);
};

const createTextMeasurer = (element: HTMLElement) => {
  const computedStyle = window.getComputedStyle(element);
  const canvas = window.document.createElement('canvas');
  const context = canvas.getContext('2d');

  if (!context) {
    return null;
  }

  context.font = [
    computedStyle.fontStyle,
    computedStyle.fontVariant,
    computedStyle.fontWeight,
    computedStyle.fontSize,
    computedStyle.fontFamily,
  ].join(' ');

  const sampleText =
    '가나다라마바사아자차카타파하ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const averageCharacterWidth = context.measureText(sampleText).width / sampleText.length;

  return {
    measureTextWidth: (value: string) => context.measureText(value).width,
    averageCharacterWidth,
  };
};

export const calculateEffectiveContentLength = (text: string, element: HTMLElement | null) => {
  if (!element || typeof window === 'undefined') {
    return text.length;
  }

  const measurer = createTextMeasurer(element);

  if (!measurer) {
    return text.length;
  }

  const editorWidth = element.clientWidth;

  if (!editorWidth) {
    return text.length;
  }

  let effectiveLength = 0;
  let currentLineWidth = 0;

  for (const character of text) {
    if (character === '\n') {
      const remainingWidth = Math.max(editorWidth - currentLineWidth, 0);
      const remainingCharacterSlots = Math.round(remainingWidth / measurer.averageCharacterWidth);

      effectiveLength += remainingCharacterSlots;
      currentLineWidth = 0;
      continue;
    }

    const characterWidth = measurer.measureTextWidth(character);

    if (currentLineWidth > 0 && currentLineWidth + characterWidth > editorWidth) {
      currentLineWidth = 0;
    }

    currentLineWidth += characterWidth;
    effectiveLength += 1;
  }

  return effectiveLength;
};
