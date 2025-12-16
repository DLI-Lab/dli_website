import {Box, Button, Dialog, Card} from '@sanity/ui'
import {ArrayOfObjectsInputProps, useClient} from 'sanity'
import {useState} from 'react'
import {PortableText, PortableTextComponents} from '@portabletext/react'
import imageUrlBuilder from '@sanity/image-url'

export function BodyInput(props: ArrayOfObjectsInputProps) {
  const [open, setOpen] = useState(false)
  const client = useClient({apiVersion: '2024-01-01'})
  const builder = imageUrlBuilder(client)

  const urlFor = (source: any) => builder.image(source)

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
        <Button
          text="Preview Blog Content"
          mode="ghost"
          tone="primary"
          onClick={() => setOpen(true)}
          style={{width: '100%', textAlign: 'center'}}
        />
      </Box>

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
