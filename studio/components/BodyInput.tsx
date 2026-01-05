import {Box, Button, Dialog, Card, TextArea, Flex, Stack} from '@sanity/ui'
import {ArrayOfObjectsInputProps, useClient, set, insert} from 'sanity'
import {useState} from 'react'
import {PortableText, PortableTextComponents} from '@portabletext/react'
import imageUrlBuilder from '@sanity/image-url'
import {markdownToPortableText} from '../utils/markdownToPortableText'

export function BodyInput(props: ArrayOfObjectsInputProps) {
  const [open, setOpen] = useState(false)
  const [markdownOpen, setMarkdownOpen] = useState(false)
  const [markdownText, setMarkdownText] = useState('')
  const [isConverting, setIsConverting] = useState(false)
  const client = useClient({apiVersion: '2024-01-01'})
  const builder = imageUrlBuilder(client)

  const urlFor = (source: any) => builder.image(source)

  const handleMarkdownImport = async () => {
    if (!markdownText.trim()) {
      alert('마크다운 텍스트를 입력해주세요.')
      return
    }

    setIsConverting(true)
    try {
      const portableTextBlocks = await markdownToPortableText(markdownText)

      if (!portableTextBlocks || portableTextBlocks.length === 0) {
        alert('변환된 콘텐츠가 없습니다.')
        setIsConverting(false)
        return
      }

      // Use Sanity's patch operations for proper array handling
      const existingBlocks = Array.isArray(props.value) ? props.value : []
      const newBlocks = [...existingBlocks, ...portableTextBlocks]

      // Use set() patch to update the entire array
      props.onChange(set(newBlocks))

      // Clear and close dialog
      setMarkdownText('')
      setMarkdownOpen(false)

      alert('마크다운이 성공적으로 변환되어 추가되었습니다.')
    } catch (error) {
      console.error('Markdown conversion error:', error)
      alert('마크다운 변환 중 오류가 발생했습니다: ' + (error as Error).message)
    } finally {
      setIsConverting(false)
    }
  }

  const ptComponents: PortableTextComponents = {
    block: {
      h1: ({children}) => (
        <h1 style={{fontSize: '2rem', fontWeight: 'bold', margin: '2rem 0 1rem'}}>{children}</h1>
      ),
      h2: ({children}) => (
        <h2 style={{fontSize: '1.5rem', fontWeight: 'bold', margin: '1.5rem 0 1rem'}}>{children}</h2>
      ),
      h3: ({children}) => (
        <h3 style={{fontSize: '1.25rem', fontWeight: 'bold', margin: '1rem 0 0.5rem'}}>{children}</h3>
      ),
      h4: ({children}) => (
        <h4 style={{fontSize: '1.1rem', fontWeight: 'bold', margin: '0.75rem 0 0.5rem'}}>{children}</h4>
      ),
      normal: ({children, value}) => {
        const isHorizontalRule =
          Array.isArray((value as any)?.children) &&
          (value as any).children.length === 1 &&
          typeof (value as any).children[0]?.text === 'string' &&
          (value as any).children[0].text.trim() === '---'

        if (isHorizontalRule) {
          return <hr style={{margin: '2rem 0', border: 0, borderTop: '1px solid #ddd'}} />
        }
        return <p style={{marginBottom: '1rem', lineHeight: 1.6}}>{children}</p>
      },
      blockquote: ({children}) => (
        <blockquote
          style={{
            borderLeft: '4px solid #ddd',
            paddingLeft: '1rem',
            fontStyle: 'italic',
            margin: '1rem 0',
            color: '#555',
          }}
        >
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({children}) => (
        <ul style={{listStyleType: 'disc', paddingLeft: '2rem', margin: '1rem 0'}}>{children}</ul>
      ),
      number: ({children}) => (
        <ol style={{listStyleType: 'decimal', paddingLeft: '2rem', margin: '1rem 0'}}>{children}</ol>
      ),
    },
    marks: {
      strong: ({children}) => <strong>{children}</strong>,
      em: ({children}) => <em>{children}</em>,
      code: ({children}) => (
        <code
          style={{
            backgroundColor: '#f5f5f5',
            padding: '0.2rem 0.4rem',
            borderRadius: '3px',
            fontFamily: 'monospace',
          }}
        >
          {children}
        </code>
      ),
      underline: ({children}) => <u>{children}</u>,
      'strike-through': ({children}) => <s>{children}</s>,
      link: ({children, value}) => (
        <a
          href={value?.href}
          style={{color: 'blue', textDecoration: 'underline'}}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      ),
    },
    types: {
      image: ({value}) => {
        if (!value?.asset?._ref && !value?.asset?.url) return null
        const src = value.asset._ref ? urlFor(value).url() : value.asset.url
        return (
          <figure style={{margin: '2rem 0', textAlign: 'center'}}>
            <img
              src={src}
              alt={value.alt || ''}
              style={{maxWidth: '100%', height: 'auto', borderRadius: '8px'}}
            />
            {value.caption && (
              <figcaption style={{marginTop: '0.5rem', color: '#666', fontSize: '0.9rem'}}>
                {value.caption}
              </figcaption>
            )}
          </figure>
        )
      },
      code: ({value}) => (
        <pre
          style={{
            backgroundColor: '#1a1a1a',
            color: '#fff',
            padding: '1rem',
            borderRadius: '8px',
            overflowX: 'auto',
            margin: '1.5rem 0',
          }}
        >
          <code>{value.code}</code>
        </pre>
      ),
    },
  }

  return (
    <Box className="body-input-wrapper">
      <style>{`
        .body-input-wrapper [data-testid="field-actions"],
        .body-input-wrapper [data-ui="MenuButton"],
        .body-input-wrapper [data-testid="field-menu-button"],
        .body-input-wrapper [data-testid="comment-field-button"],
        .body-input-wrapper > div > div > div > [data-ui="Flex"] > button {
          display: none !important;
        }
        /* Increase height of the editor */
        .body-input-wrapper [data-testid="pt-editor"] {
           min-height: 600px !important;
        }
        .body-input-wrapper [data-testid="scroll-container"] {
           min-height: 600px !important;
        }
      `}</style>
      {props.renderDefault(props)}

      <Box padding={3}>
        <Flex gap={2}>
          <Button
            text="Import from Markdown"
            mode="ghost"
            tone="caution"
            onClick={() => setMarkdownOpen(true)}
            style={{flex: 1}}
          />
          <Button
            text="Preview Blog Content"
            mode="ghost"
            tone="primary"
            onClick={() => setOpen(true)}
            style={{flex: 1}}
          />
        </Flex>
      </Box>

      {markdownOpen && (
        <Dialog
          header="Import from Markdown"
          onClose={() => {
            setMarkdownOpen(false)
            setMarkdownText('')
          }}
          width={2}
          id="markdown-import-dialog"
        >
          <Box padding={4}>
            <Stack space={4}>
              <div>
                <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 'bold'}}>
                  Markdown Content
                </label>
                <TextArea
                  value={markdownText}
                  onChange={(event) => setMarkdownText(event.currentTarget.value)}
                  placeholder="마크다운을 여기에 붙여넣으세요. 제목(#), 굵은텍스트(**), 이탤릭(*), 코드(`) 등을 지원합니다."
                  style={{minHeight: '300px', fontFamily: 'monospace', fontSize: '0.9rem'}}
                />
              </div>
              <Flex gap={2} justify="flex-end">
                <Button
                  text="Cancel"
                  mode="ghost"
                  onClick={() => {
                    setMarkdownOpen(false)
                    setMarkdownText('')
                  }}
                  disabled={isConverting}
                />
                <Button
                  text={isConverting ? 'Converting...' : 'Import'}
                  tone="positive"
                  onClick={handleMarkdownImport}
                  disabled={isConverting || !markdownText.trim()}
                />
              </Flex>
            </Stack>
          </Box>
        </Dialog>
      )}

      {open && (
        <Dialog
          header="Blog Content Preview"
          onClose={() => setOpen(false)}
          width={2}
          id="preview-dialog"
        >
          <Box padding={4}>
            <Card style={{maxWidth: '800px', margin: '0 auto'}}>
              {props.value ? (
                <PortableText value={props.value as any[]} components={ptComponents} />
              ) : (
                <p>No content to preview.</p>
              )}
            </Card>
          </Box>
        </Dialog>
      )}
    </Box>
  )
}
