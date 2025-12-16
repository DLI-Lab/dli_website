import {Box, Flex} from '@sanity/ui'
import {PreviewProps} from 'sanity'

export function PortableTextImagePreview(props: PreviewProps) {
  // Render the default preview but constrain its height
  // Sanity's default preview for images usually fills the width.
  // We wrap it to control size.
  return (
    <Flex justify="center" align="center" style={{width: '100%', padding: '10px', background: '#f5f5f5'}}>
      <Box style={{maxWidth: '500px', maxHeight: '300px', overflow: 'hidden', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>
        {props.renderDefault({...props, layout: 'block'})}
      </Box>
    </Flex>
  )
}

