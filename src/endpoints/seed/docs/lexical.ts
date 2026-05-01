import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

// Inline tokens
type InlineToken =
  | string
  | { b: string }
  | { i: string }
  | { code: string }
  | { link: { text: string; url: string } }

// Block specs — compact mini language for authoring docs
export type Block =
  | { h: 1 | 2 | 3 | 4; text: string }
  | { p: InlineToken | InlineToken[] }
  | { ul: (InlineToken | InlineToken[])[] }
  | { ol: (InlineToken | InlineToken[])[] }
  | { quote: string }

const inline = (token: InlineToken): any => {
  if (typeof token === 'string') {
    return {
      type: 'text',
      detail: 0,
      format: 0,
      mode: 'normal',
      style: '',
      text: token,
      version: 1,
    }
  }
  if ('b' in token) {
    return {
      type: 'text',
      detail: 0,
      format: 1, // bold
      mode: 'normal',
      style: '',
      text: token.b,
      version: 1,
    }
  }
  if ('i' in token) {
    return {
      type: 'text',
      detail: 0,
      format: 2, // italic
      mode: 'normal',
      style: '',
      text: token.i,
      version: 1,
    }
  }
  if ('code' in token) {
    return {
      type: 'text',
      detail: 0,
      format: 16, // code
      mode: 'normal',
      style: '',
      text: token.code,
      version: 1,
    }
  }
  if ('link' in token) {
    return {
      type: 'link',
      children: [
        {
          type: 'text',
          detail: 0,
          format: 0,
          mode: 'normal',
          style: '',
          text: token.link.text,
          version: 1,
        },
      ],
      direction: 'ltr',
      fields: { linkType: 'custom', newTab: false, url: token.link.url },
      format: '',
      indent: 0,
      version: 2,
    }
  }
  throw new Error('Unknown inline token')
}

const inlineChildren = (tokens: InlineToken | InlineToken[]): any[] =>
  (Array.isArray(tokens) ? tokens : [tokens]).map(inline)

const listItem = (tokens: InlineToken | InlineToken[]): any => ({
  type: 'listitem',
  children: inlineChildren(tokens),
  direction: 'ltr',
  format: '',
  indent: 0,
  version: 1,
  value: 1,
})

export const lexical = (blocks: Block[]): DefaultTypedEditorState => {
  const children = blocks.map((b): any => {
    if ('h' in b) {
      return {
        type: 'heading',
        children: [
          {
            type: 'text',
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: b.text,
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        tag: `h${b.h}`,
        version: 1,
      }
    }
    if ('p' in b) {
      return {
        type: 'paragraph',
        children: inlineChildren(b.p),
        direction: 'ltr',
        format: '',
        indent: 0,
        textFormat: 0,
        version: 1,
      }
    }
    if ('ul' in b) {
      return {
        type: 'list',
        listType: 'bullet',
        tag: 'ul',
        start: 1,
        children: b.ul.map(listItem),
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      }
    }
    if ('ol' in b) {
      return {
        type: 'list',
        listType: 'number',
        tag: 'ol',
        start: 1,
        children: b.ol.map(listItem),
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      }
    }
    if ('quote' in b) {
      return {
        type: 'quote',
        children: [
          {
            type: 'text',
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: b.quote,
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      }
    }
    throw new Error('Unknown block type')
  })

  return {
    root: {
      type: 'root',
      children,
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  } as DefaultTypedEditorState
}
