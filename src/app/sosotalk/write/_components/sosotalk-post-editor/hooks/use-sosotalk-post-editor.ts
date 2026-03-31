'use client';

import type { ChangeEvent, FormEvent } from 'react';
import { useEffect, useRef, useState } from 'react';

import {
  SOSOTALK_POST_EDITOR_CONTENT_MAX_LENGTH,
  SOSOTALK_POST_EDITOR_TITLE_MAX_LENGTH,
} from '../sosotalk-post-editor.constants';
import type { ActiveFormats } from '../sosotalk-post-editor.internal-types';
import type { SosoTalkPostEditorProps } from '../sosotalk-post-editor.types';
import {
  calculateEffectiveContentLength,
  extractTextFromHtml,
  toInitialHtml,
  toInitialText,
} from '../sosotalk-post-editor.utils';

import { useSosoTalkPostEditorImage } from './use-sosotalk-post-editor-image';

const DEFAULT_ACTIVE_FORMATS: ActiveFormats = {
  bold: false,
  italic: false,
  underline: false,
  unorderedList: false,
  orderedList: false,
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
  const lastValidTextRef = useRef(toInitialText(initialContent));
  const lastValidEffectiveLengthRef = useRef(toInitialText(initialContent).length);

  const [title, setTitle] = useState(initialTitle);
  const [contentHtml, setContentHtml] = useState(toInitialHtml(initialContent));
  const [contentText, setContentText] = useState(toInitialText(initialContent));
  const [effectiveContentLength, setEffectiveContentLength] = useState(
    toInitialText(initialContent).length
  );
  const [activeFormats, setActiveFormats] = useState<ActiveFormats>(DEFAULT_ACTIVE_FORMATS);
  const { handleImageChange, handleImageRemove, imageFile, imagePreviewUrl } =
    useSosoTalkPostEditorImage({
      fileInputRef,
      initialImageUrl,
    });

  useEffect(() => {
    setTitle(initialTitle);
  }, [initialTitle]);

  useEffect(() => {
    const nextHtml = toInitialHtml(initialContent);
    const nextText = toInitialText(initialContent);
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
      const isCenterAligned =
        command === 'justifyCenter' && typeof document !== 'undefined'
          ? document.queryCommandState('justifyCenter')
          : false;

      if (command === 'justifyCenter' && isCenterAligned) {
        document.execCommand('justifyLeft', false, value);
      } else {
        document.execCommand(command, false, value);
      }
      syncEditorState();
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
      // This is the currently displayed image source.
      // When a new file is selected it can be a local blob URL, so callers
      // must ignore it whenever imageFile exists.
      displayImageUrl: imagePreviewUrl,
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
