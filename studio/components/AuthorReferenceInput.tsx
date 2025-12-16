import {useCallback} from 'react'
import {Flex, Button, Box} from '@sanity/ui'
import {CloseIcon} from '@sanity/icons'
import {ReferenceInputProps, unset} from 'sanity'

export function AuthorReferenceInput(props: ReferenceInputProps) {
  const {value, onChange, renderDefault} = props

  const handleClear = useCallback(() => {
    onChange(unset())
  }, [onChange])

  return (
    <Flex align="center" gap={2}>
      <Box flex={1}>{renderDefault(props)}</Box>
      {value?._ref && (
        <Button
          icon={CloseIcon}
          mode="ghost"
          tone="critical"
          onClick={handleClear}
          title="멤버 삭제"
          aria-label="Clear member"
          style={{flexShrink: 0}}
        />
      )}
    </Flex>
  )
}
