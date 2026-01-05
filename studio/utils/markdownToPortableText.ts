import {marked, Token, Tokens} from 'marked'

export interface PortableTextBlock {
  _type: string
  _key?: string
  style?: string
  children?: PortableTextChild[]
  markDefs?: MarkDef[]
  level?: number
  listItem?: string
  [key: string]: any
}

export interface MarkDef {
  _type: string
  _key: string
  href?: string
  [key: string]: any
}

export interface PortableTextChild {
  _type: string
  _key?: string
  text: string
  marks?: string[]
}

/**
 * Convert markdown to Sanity Portable Text format
 */
export async function markdownToPortableText(markdown: string): Promise<PortableTextBlock[]> {
  if (!markdown || markdown.trim() === '') {
    return []
  }

  const blocks: PortableTextBlock[] = []
  let blockKeyCounter = 0
  let spanKeyCounter = 0

  const generateBlockKey = () => `block-${blockKeyCounter++}`
  const generateSpanKey = () => `span-${spanKeyCounter++}`

  try {
    // Tokenize markdown - handle both sync and async
    let tokens: Token[] = []
    try {
      tokens = marked.lexer(markdown) as Token[]
    } catch (e) {
      // Fallback to manual parsing if lexer fails
      console.error('Marked lexer error:', e)
      return parseFallback(markdown, generateBlockKey, generateSpanKey)
    }

    if (!tokens || tokens.length === 0) {
      return []
    }

    for (const token of tokens) {
    switch (token.type) {
      case 'heading': {
        const headingToken = token as Tokens.Heading
        // Use raw text to preserve markdown syntax
        const rawText = headingToken.raw?.replace(/^#+\s*/, '').trim() || headingToken.text
        const parsed = parseInlineContent(rawText, generateSpanKey)
        const block: PortableTextBlock = {
          _key: generateBlockKey(),
          _type: 'block',
          style: `h${headingToken.depth}`,
          children: parsed.children,
          markDefs: parsed.markDefs,
        }
        blocks.push(block)
        break
      }

      case 'paragraph': {
        const paragraphToken = token as Tokens.Paragraph
        // Use raw text to preserve markdown syntax like **bold**
        const rawText = paragraphToken.raw?.trim() || paragraphToken.text
        const parsed = parseInlineContent(rawText, generateSpanKey)
        const block: PortableTextBlock = {
          _key: generateBlockKey(),
          _type: 'block',
          style: 'normal',
          children: parsed.children,
          markDefs: parsed.markDefs,
        }
        blocks.push(block)
        break
      }

      case 'hr': {
        const block: PortableTextBlock = {
          _key: generateBlockKey(),
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: generateSpanKey(),
              text: '---',
            },
          ],
        }
        blocks.push(block)
        break
      }

      case 'list': {
        const listToken = token as Tokens.List
        const listType = listToken.ordered ? 'number' : 'bullet'

        if (listToken.items && Array.isArray(listToken.items)) {
          for (const item of listToken.items) {
            const itemToken = item as Tokens.ListItem
            // Use raw text to preserve markdown syntax
            const rawText = itemToken.raw?.replace(/^[\s]*[-*+\d.]+\s*/, '').trim() || itemToken.text || ''
            const parsed = parseInlineContent(rawText, generateSpanKey)
            const block: PortableTextBlock = {
              _key: generateBlockKey(),
              _type: 'block',
              style: 'normal',
              listItem: listType,
              children: parsed.children,
              markDefs: parsed.markDefs,
            }
            blocks.push(block)
          }
        }
        break
      }

      case 'blockquote': {
        const quoteToken = token as Tokens.Blockquote
        // Use raw text and clean up > prefixes
        let quoteContent = ''
        if (quoteToken.raw) {
          quoteContent = quoteToken.raw
            .split('\n')
            .map((line: string) => line.replace(/^>\s*/, ''))
            .join(' ')
            .trim()
        } else if (quoteToken.text) {
          quoteContent = quoteToken.text
        }

        const parsed = parseInlineContent(quoteContent, generateSpanKey)
        const block: PortableTextBlock = {
          _key: generateBlockKey(),
          _type: 'block',
          style: 'blockquote',
          children: parsed.children,
          markDefs: parsed.markDefs,
        }
        blocks.push(block)
        break
      }

      case 'code': {
        const codeToken = token as Tokens.Code
        const block: PortableTextBlock = {
          _key: generateBlockKey(),
          _type: 'code',
          code: codeToken.text,
          language: codeToken.lang || 'text',
        }
        blocks.push(block)
        break
      }

      case 'table': {
        const tableToken = token as Tokens.Table
        // Convert table to text format
        const tableLines: string[] = []

        try {
          // Handle header - can be array of strings or array of objects with text property
          if (tableToken.header && Array.isArray(tableToken.header) && tableToken.header.length > 0) {
            const headerCells = tableToken.header.map((cell: any) => {
              if (typeof cell === 'string') return cell
              if (cell && typeof cell === 'object' && 'text' in cell) return cell.text
              return String(cell || '')
            })
            tableLines.push('| ' + headerCells.join(' | ') + ' |')
            tableLines.push('| ' + headerCells.map(() => '---').join(' | ') + ' |')
          }

          // Handle rows - can be array of arrays of strings or array of arrays of objects
          if (tableToken.rows && Array.isArray(tableToken.rows) && tableToken.rows.length > 0) {
            for (const row of tableToken.rows) {
              if (Array.isArray(row)) {
                const rowCells = row.map((cell: any) => {
                  if (typeof cell === 'string') return cell
                  if (cell && typeof cell === 'object' && 'text' in cell) return cell.text
                  return String(cell || '')
                })
                tableLines.push('| ' + rowCells.join(' | ') + ' |')
              }
            }
          }
        } catch (e) {
          console.error('Table parsing error:', e)
        }

        if (tableLines.length > 0) {
          const tableText = tableLines.join('\n')
          const parsed = parseInlineContent(tableText, generateSpanKey)
          const block: PortableTextBlock = {
            _key: generateBlockKey(),
            _type: 'block',
            style: 'normal',
            children: parsed.children,
            markDefs: parsed.markDefs,
          }
          blocks.push(block)
        }
        break
      }

      case 'space':
        // Skip space tokens
        break

      default:
        if ('text' in token) {
          const parsed = parseInlineContent((token as any).text, generateSpanKey)
          const block: PortableTextBlock = {
            _key: generateBlockKey(),
            _type: 'block',
            style: 'normal',
            children: parsed.children,
            markDefs: parsed.markDefs,
          }
          blocks.push(block)
        }
        break
    }
    }

    return blocks
  } catch (error) {
    console.error('Markdown to Portable Text conversion error:', error)
    // Return empty blocks on error
    return []
  }
}

/**
 * Fallback parser for when marked.lexer fails
 */
function parseFallback(
  markdown: string,
  generateBlockKey: () => string,
  generateSpanKey: () => string
): PortableTextBlock[] {
  const blocks: PortableTextBlock[] = []
  const lines = markdown.split('\n')
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // Skip empty lines
    if (!line.trim()) {
      i++
      continue
    }

    // Headings
    if (line.startsWith('#')) {
      const level = line.match(/^#+/)?.[0].length || 1
      const text = line.replace(/^#+\s*/, '')
      const parsed = parseInlineContent(text, generateSpanKey)
      blocks.push({
        _key: generateBlockKey(),
        _type: 'block',
        style: `h${Math.min(level, 4)}`,
        children: parsed.children,
        markDefs: parsed.markDefs,
      })
      i++
      continue
    }

    // Horizontal rule
    if (line.match(/^(-{3,}|_{3,}|\*{3,})$/)) {
      blocks.push({
        _key: generateBlockKey(),
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: generateSpanKey(),
            text: '---',
          },
        ],
      })
      i++
      continue
    }

    // Lists
    if (line.match(/^[\s]*[-*+]\s/)) {
      const bulletItems = []
      while (i < lines.length && lines[i].match(/^[\s]*[-*+]\s/)) {
        const itemText = lines[i].replace(/^[\s]*[-*+]\s*/, '')
        bulletItems.push(itemText)
        i++
      }

      for (const item of bulletItems) {
        const parsed = parseInlineContent(item, generateSpanKey)
        blocks.push({
          _key: generateBlockKey(),
          _type: 'block',
          style: 'normal',
          listItem: 'bullet',
          children: parsed.children,
          markDefs: parsed.markDefs,
        })
      }
      continue
    }

    if (line.match(/^[\s]*\d+\.\s/)) {
      const numberItems = []
      while (i < lines.length && lines[i].match(/^[\s]*\d+\.\s/)) {
        const itemText = lines[i].replace(/^[\s]*\d+\.\s*/, '')
        numberItems.push(itemText)
        i++
      }

      for (const item of numberItems) {
        const parsed = parseInlineContent(item, generateSpanKey)
        blocks.push({
          _key: generateBlockKey(),
          _type: 'block',
          style: 'normal',
          listItem: 'number',
          children: parsed.children,
          markDefs: parsed.markDefs,
        })
      }
      continue
    }

    // Blockquotes
    if (line.startsWith('>')) {
      const quoteLines: string[] = []
      while (i < lines.length && lines[i].startsWith('>')) {
        quoteLines.push(lines[i].replace(/^>\s*/, ''))
        i++
      }
      const parsed = parseInlineContent(quoteLines.join(' '), generateSpanKey)
      blocks.push({
        _key: generateBlockKey(),
        _type: 'block',
        style: 'blockquote',
        children: parsed.children,
        markDefs: parsed.markDefs,
      })
      continue
    }

    // Tables (markdown table format: | header | ... |)
    if (line.includes('|')) {
      const tableLines = [line]
      i++

      // Check if next line is separator (|---|---|...)
      if (i < lines.length && lines[i].match(/^\s*\|[\s\-|:]+\|\s*$/)) {
        tableLines.push(lines[i])
        i++

        // Collect table rows
        while (i < lines.length && lines[i].includes('|')) {
          tableLines.push(lines[i])
          i++
        }

        // Parse and convert table to text format
        const tableText = parseTable(tableLines)
        if (tableText) {
          const parsed = parseInlineContent(tableText, generateSpanKey)
          blocks.push({
            _key: generateBlockKey(),
            _type: 'block',
            style: 'normal',
            children: parsed.children,
            markDefs: parsed.markDefs,
          })
          continue
        }
      }
    }

    // Regular paragraphs
    const parsed = parseInlineContent(line, generateSpanKey)
    blocks.push({
      _key: generateBlockKey(),
      _type: 'block',
      style: 'normal',
      children: parsed.children,
      markDefs: parsed.markDefs,
    })
    i++
  }

  return blocks
}

/**
 * Parse markdown table and convert to readable text format
 */
function parseTable(tableLines: string[]): string {
  if (tableLines.length < 2) return ''

  const rows = tableLines.map((line) =>
    line
      .split('|')
      .map((cell) => cell.trim())
      .filter((cell) => cell !== '')
  )

  if (rows.length < 2) return ''

  // Build readable table text
  const result: string[] = []
  const header = rows[0]
  const separator = rows[1]

  // Add header row
  result.push('| ' + header.join(' | ') + ' |')
  result.push('| ' + separator.map(() => '---').join(' | ') + ' |')

  // Add data rows
  for (let i = 2; i < rows.length; i++) {
    const row = rows[i]
    if (row.length > 0) {
      result.push('| ' + row.join(' | ') + ' |')
    }
  }

  return result.join('\n')
}

interface ParsedInlineResult {
  children: PortableTextChild[]
  markDefs: MarkDef[]
}

/**
 * Parse inline markdown content (bold, italic, code, links)
 */
function parseInlineContent(
  text: string,
  generateSpanKey: () => string
): ParsedInlineResult {
  if (!text || text.trim() === '') {
    return {
      children: [
        {
          _type: 'span',
          _key: generateSpanKey(),
          text: '',
        },
      ],
      markDefs: [],
    }
  }

  const children: PortableTextChild[] = []
  const markDefs: MarkDef[] = []
  let i = 0
  let currentText = ''
  let linkKeyCounter = 0

  const flushText = () => {
    if (currentText) {
      children.push({
        _type: 'span',
        _key: generateSpanKey(),
        text: currentText,
      })
      currentText = ''
    }
  }

  const generateLinkKey = () => `link-${linkKeyCounter++}`

  while (i < text.length) {
    // Check for bold (**text**)
    if (text.substr(i, 2) === '**') {
      flushText()
      const endIndex = text.indexOf('**', i + 2)
      if (endIndex !== -1) {
        const boldText = text.substring(i + 2, endIndex)
        children.push({
          _type: 'span',
          _key: generateSpanKey(),
          text: boldText,
          marks: ['strong'],
        })
        i = endIndex + 2
        continue
      }
    }

    // Check for italic (*text*)
    if (text[i] === '*' && text[i + 1] !== '*') {
      flushText()
      const endIndex = text.indexOf('*', i + 1)
      if (endIndex !== -1 && text[endIndex + 1] !== '*') {
        const italicText = text.substring(i + 1, endIndex)
        children.push({
          _type: 'span',
          _key: generateSpanKey(),
          text: italicText,
          marks: ['em'],
        })
        i = endIndex + 1
        continue
      }
    }

    // Check for code (`text`)
    if (text[i] === '`') {
      flushText()
      const endIndex = text.indexOf('`', i + 1)
      if (endIndex !== -1) {
        const codeText = text.substring(i + 1, endIndex)
        children.push({
          _type: 'span',
          _key: generateSpanKey(),
          text: codeText,
          marks: ['code'],
        })
        i = endIndex + 1
        continue
      }
    }

    // Check for links [text](url)
    if (text[i] === '[') {
      flushText()
      const closeBracket = text.indexOf(']', i)
      if (closeBracket !== -1 && text[closeBracket + 1] === '(') {
        const closeParen = text.indexOf(')', closeBracket)
        if (closeParen !== -1) {
          const linkText = text.substring(i + 1, closeBracket)
          const linkUrl = text.substring(closeBracket + 2, closeParen)
          const linkKey = generateLinkKey()

          // Add mark definition for link
          markDefs.push({
            _type: 'link',
            _key: linkKey,
            href: linkUrl,
          })

          // Reference the link by key in marks
          children.push({
            _type: 'span',
            _key: generateSpanKey(),
            text: linkText,
            marks: [linkKey],
          })
          i = closeParen + 1
          continue
        }
      }
    }

    // Regular character
    currentText += text[i]
    i++
  }

  flushText()

  // Ensure at least one child
  if (children.length === 0) {
    children.push({
      _type: 'span',
      _key: generateSpanKey(),
      text: text,
    })
  }

  return {children, markDefs}
}
