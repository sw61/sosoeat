'use client';

import type { ChangeEvent, FormEvent } from 'react';
import { useEffect, useRef, useState } from 'react';

import {
  SOSOTALK_POST_EDITOR_CONTENT_MAX_LENGTH,
  SOSOTALK_POST_EDITOR_TITLE_MAX_LENGTH,
} from '../sosotalk-post-editor.constants';
import type { SosoTalkPostEditorProps } from '../sosotalk-post-editor.types';
import {
  calculateEffectiveContentLength,
  extractTextFromHtml,
  normalizePlainText,
  toInitialHtml,
} from '../sosotalk-post-editor.utils';

type ActiveKey =
  | 'bold'
  | 'italic'
  | 'underline'
  | 'unorderedList'
  | 'orderedList'
  | 'alignLeft'
  | 'alignCenter';

type ActiveFormats = Record<ActiveKey, boolean>;

const DEFAULT_ACTIVE_FORMATS: ActiveFormats = {
  bold: false,
  italic: false,
  underline: false,
  unorderedList: false,
  orderedList: false,
  alignLeft: true,
  alignCenter: false,
};

type UseSosoTalkPostEditorParams = Pick<
  SosoTalkPostEditorProps,
  'initialTitle' | 'initialContent' | 'initialImageUrl' | 'onSubmit'
>;

export const useSosoTalkPostEditor = ({
  initialTitle = '',
  initialContent = '',
  initialImageUrl = '',
  onSubmit,
}: UseSosoTalkPostEditorParams) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const lastValidHtmlRef = useRef(toInitialHtml(initialContent));
  const lastValidTextRef = useRef(normalizePlainText(initialContent));
  const lastValidEffectiveLengthRef = useRef(normalizePlainText(initialContent).length);

  const [title, setTitle] = useState(initialTitle);
  const [contentHtml, setContentHtml] = useState(toInitialHtml(initialContent));
  const [contentText, setContentText] = useState(normalizePlainText(initialContent));
  const [effectiveContentLength, setEffectiveContentLength] = useState(
    normalizePlainText(initialContent).length
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  // Preview URL is UI-only state for local rendering and should not be sent to the API.
  const [imagePreviewUrl, setImagePreviewUrl] = useState(initialImageUrl);
  const [activeFormats, setActiveFormats] = useState<ActiveFormats>(DEFAULT_ACTIVE_FORMATS);

  useEffect(() => {
    setTitle(initialTitle);
  }, [initialTitle]);

  useEffect(() => {
    const nextHtml = toInitialHtml(initialContent);
    const nextText = normalizePlainText(initialContent);
    const nextEffectiveLength = nextText.length;

    setContentHtml(nextHtml);
    setContentText(nextText);
    setEffectiveContentLength(nextEffectiveLength);
    lastValidHtmlRef.current = nextHtml;
    lastValidTextRef.current = nextText;
    lastValidEffectiveLengthRef.current = nextEffectiveLength;

    if (editorRef.current) {
      editorRef.current.innerHTML = nextHtml;
    }
  }, [initialContent]);

  useEffect(() => {
    setImagePreviewUrl(initialImageUrl);
  }, [initialImageUrl]);

  useEffect(() => {
    if (!imageFile) {
      return;
    }

    const objectUrl = URL.createObjectURL(imageFile);
    setImagePreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [imageFile]);

  const updateToolbarState = () => {
    if (!editorRef.current || typeof document === 'undefined') {
      return;
    }

    const selection = window.getSelection();
    const anchorNode = selection?.anchorNode;
    const isInsideEditor = anchorNode ? editorRef.current.contains(anchorNode) : false;

    if (!isInsideEditor) {
      setActiveFormats(DEFAULT_ACTIVE_FORMATS);
      return;
    }

    setActiveFormats({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
      unorderedList: document.queryCommandState('insertUnorderedList'),
      orderedList: document.queryCommandState('insertOrderedList'),
      alignLeft: !document.queryCommandState('justifyCenter'),
      alignCenter: document.queryCommandState('justifyCenter'),
    });
  };

  useEffect(() => {
    document.addEventListener('selectionchange', updateToolbarState);

    return () => {
      document.removeEventListener('selectionchange', updateToolbarState);
    };
  }, []);

  const syncEditorState = () => {
    const nextHtml = editorRef.current?.innerHTML ?? '';
    const nextText = extractTextFromHtml(nextHtml);
    const nextEffectiveLength = calculateEffectiveContentLength(nextText, editorRef.current);

    if (nextEffectiveLength > SOSOTALK_POST_EDITOR_CONTENT_MAX_LENGTH) {
      if (editorRef.current) {
        editorRef.current.innerHTML = lastValidHtmlRef.current;
      }

      setContentHtml(lastValidHtmlRef.current);
      setContentText(lastValidTextRef.current);
      setEffectiveContentLength(lastValidEffectiveLengthRef.current);
      updateToolbarState();
      return;
    }

    lastValidHtmlRef.current = nextHtml;
    lastValidTextRef.current = nextText;
    lastValidEffectiveLengthRef.current = nextEffectiveLength;

    setContentHtml(nextHtml);
    setContentText(nextText);
    setEffectiveContentLength(nextEffectiveLength);
    updateToolbarState();
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value.slice(0, SOSOTALK_POST_EDITOR_TITLE_MAX_LENGTH));
  };

  const handleEditorInput = () => {
    if (!editorRef.current) {
      return;
    }

    syncEditorState();
  };

  const handleToolbarAction = (command?: string, value?: string, isImage?: boolean) => {
    if (isImage) {
      fileInputRef.current?.click();
      return;
    }

    editorRef.current?.focus();

    if (command) {
      document.execCommand(command, false, value);
      syncEditorState();
    }
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextFile = event.target.files?.[0] ?? null;
    setImageFile(nextFile);

    if (!nextFile) {
      setImagePreviewUrl('');
    }
  };

  const handleImageRemove = () => {
    setImageFile(null);
    setImagePreviewUrl('');

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      title.trim().length === 0 ||
      contentText.trim().length === 0 ||
      effectiveContentLength > SOSOTALK_POST_EDITOR_CONTENT_MAX_LENGTH
    ) {
      return;
    }

    // Submit only the fields the server actually needs.
    onSubmit?.({
      title: title.trim(),
      contentHtml,
      contentText,
      imageFile,
    });
  };

  return {
    activeFormats,
    contentLengthWithoutSpaces: contentText.replace(/\s/g, '').length,
    contentText,
    editorRef,
    effectiveContentLength,
    fileInputRef,
    handleEditorInput,
    handleImageChange,
    handleImageRemove,
    handleSubmit,
    handleTitleChange,
    handleToolbarAction,
    imageFile,
    imagePreviewUrl,
    isSubmitDisabled:
      title.trim().length === 0 ||
      contentText.trim().length === 0 ||
      effectiveContentLength > SOSOTALK_POST_EDITOR_CONTENT_MAX_LENGTH,
    title,
    syncEditorState,
  };
};
