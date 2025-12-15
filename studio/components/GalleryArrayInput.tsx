import {ArrayOfObjectsInputProps, useClient, set} from 'sanity'
import {useCallback, useRef, useState} from 'react'

// 고유한 _key 생성 함수
const generateKey = () => Math.random().toString(36).slice(2, 10)

export function GalleryImagesArrayInput(props: ArrayOfObjectsInputProps) {
  const isEmpty = !props.value || props.value.length === 0
  const client = useClient({apiVersion: '2024-01-01'})
  const [isDragging, setIsDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dragCounterRef = useRef(0)

  const handleFiles = useCallback(
    async (files: FileList | File[]) => {
      const fileArray = Array.from(files)
      const imageFiles = fileArray.filter((file) => file.type.startsWith('image/'))

      if (imageFiles.length === 0) {
        console.warn('이미지 파일만 업로드할 수 있습니다')
        return
      }

      setUploading(true)
      setUploadProgress(`0 / ${imageFiles.length}`)
      
      try {
        const uploadedImages: Array<{_key: string; _type: string; asset: {_type: string; _ref: string}}> = []
        
        for (let i = 0; i < imageFiles.length; i++) {
          const file = imageFiles[i]
          setUploadProgress(`${i + 1} / ${imageFiles.length}`)
          
          const asset = await client.assets.upload('image', file, {
            filename: file.name,
          })

          uploadedImages.push({
            _key: generateKey(),
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: asset._id,
            },
          })
        }

        // 배열에 이미지 추가 (set 함수 사용)
        const currentValue = props.value || []
        props.onChange(set([...currentValue, ...uploadedImages]))
      } catch (error) {
        console.error('이미지 업로드 중 오류가 발생했습니다:', error)
      } finally {
        setUploading(false)
        setUploadProgress('')
      }
    },
    [client, props]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      dragCounterRef.current = 0
      setIsDragging(false)

      const files = e.dataTransfer.files
      if (files.length > 0) {
        handleFiles(files)
      }
    },
    [handleFiles]
  )

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    dragCounterRef.current++
    if (e.dataTransfer.types.includes('Files')) {
      setIsDragging(true)
    }
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    dragCounterRef.current--
    if (dragCounterRef.current === 0) {
      setIsDragging(false)
    }
  }, [])

  const handleClick = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (files && files.length > 0) {
        handleFiles(files)
      }
      // Reset input so same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    },
    [handleFiles]
  )

  return (
    <div
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      style={{
        position: 'relative',
      }}
    >
      {/* 드래그 오버레이 - 항상 전체 영역에서 작동 */}
      {isDragging && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            border: '3px dashed #3b82f6',
            borderRadius: '8px',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              padding: '1.5rem 2rem',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            }}
          >
            <div style={{fontSize: '16px', fontWeight: 600, color: '#3b82f6', textAlign: 'center'}}>
              여기에 이미지를 놓으세요
            </div>
            <div style={{fontSize: '13px', color: '#64748b', textAlign: 'center', marginTop: '4px'}}>
              여러 장 동시 업로드 가능
            </div>
          </div>
        </div>
      )}

      {/* 업로드 진행 상태 표시 */}
      {uploading && (
        <div
          style={{
            padding: '12px 16px',
            marginBottom: '12px',
            backgroundColor: '#eff6ff',
            border: '1px solid #bfdbfe',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <div
            style={{
              width: '20px',
              height: '20px',
              border: '2px solid #3b82f6',
              borderTopColor: 'transparent',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }}
          />
          <span style={{fontSize: '14px', color: '#1e40af', fontWeight: 500}}>
            업로드 중... {uploadProgress}
          </span>
        </div>
      )}

      {/* 빈 상태일 때 큰 드롭존 */}
      {isEmpty && !uploading && (
        <div
          onClick={handleClick}
          style={{
            minHeight: '200px',
            border: '2px dashed #cbd5e1',
            borderRadius: '8px',
            backgroundColor: '#f8fafc',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            marginBottom: '1rem',
            gap: '0.5rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          <div style={{fontSize: '32px', marginBottom: '8px'}}>📷</div>
          <div style={{fontSize: '14px', fontWeight: 500, color: '#64748b', textAlign: 'center'}}>
            이미지를 드래그 앤 드롭하거나 클릭하여 업로드하세요
          </div>
          <div style={{fontSize: '12px', color: '#94a3b8', textAlign: 'center'}}>
            여러 장을 한 번에 선택할 수 있습니다
          </div>
        </div>
      )}

      {/* 이미지가 있을 때 작은 추가 업로드 버튼 */}
      {!isEmpty && !uploading && (
        <div
          onClick={handleClick}
          style={{
            padding: '12px 16px',
            marginBottom: '12px',
            backgroundColor: '#f8fafc',
            border: '2px dashed #e2e8f0',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#eff6ff'
            e.currentTarget.style.borderColor = '#3b82f6'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#f8fafc'
            e.currentTarget.style.borderColor = '#e2e8f0'
          }}
        >
          <span style={{fontSize: '18px'}}>➕</span>
          <span style={{fontSize: '14px', fontWeight: 500, color: '#64748b'}}>
            이미지 추가 (드래그 앤 드롭 또는 클릭)
          </span>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        style={{display: 'none'}}
        onChange={handleFileInputChange}
      />

      {/* 기본 Sanity 배열 렌더링 (이미 업로드된 이미지들) */}
      {props.renderDefault(props)}

      {/* 스피너 애니메이션용 CSS */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export function GalleryVideosArrayInput(props: ArrayOfObjectsInputProps) {
  const isEmpty = !props.value || props.value.length === 0
  const client = useClient({apiVersion: '2024-01-01'})
  const [isDragging, setIsDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dragCounterRef = useRef(0)

  const handleFiles = useCallback(
    async (files: FileList | File[]) => {
      const fileArray = Array.from(files)
      const videoFiles = fileArray.filter((file) => file.type.startsWith('video/'))

      if (videoFiles.length === 0) {
        console.warn('비디오 파일만 업로드할 수 있습니다')
        return
      }

      setUploading(true)
      setUploadProgress(`0 / ${videoFiles.length}`)
      
      try {
        const uploadedVideos: Array<{_key: string; _type: string; asset: {_type: string; _ref: string}}> = []
        
        for (let i = 0; i < videoFiles.length; i++) {
          const file = videoFiles[i]
          setUploadProgress(`${i + 1} / ${videoFiles.length}`)
          
          const asset = await client.assets.upload('file', file, {
            filename: file.name,
          })

          uploadedVideos.push({
            _key: generateKey(),
            _type: 'file',
            asset: {
              _type: 'reference',
              _ref: asset._id,
            },
          })
        }

        // 배열에 비디오 추가 (set 함수 사용)
        const currentValue = props.value || []
        props.onChange(set([...currentValue, ...uploadedVideos]))
      } catch (error) {
        console.error('비디오 업로드 중 오류가 발생했습니다:', error)
      } finally {
        setUploading(false)
        setUploadProgress('')
      }
    },
    [client, props]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      dragCounterRef.current = 0
      setIsDragging(false)

      const files = e.dataTransfer.files
      if (files.length > 0) {
        handleFiles(files)
      }
    },
    [handleFiles]
  )

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    dragCounterRef.current++
    if (e.dataTransfer.types.includes('Files')) {
      setIsDragging(true)
    }
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    dragCounterRef.current--
    if (dragCounterRef.current === 0) {
      setIsDragging(false)
    }
  }, [])

  const handleClick = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (files && files.length > 0) {
        handleFiles(files)
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    },
    [handleFiles]
  )

  return (
    <div
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      style={{
        position: 'relative',
      }}
    >
      {/* 드래그 오버레이 */}
      {isDragging && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(168, 85, 247, 0.1)',
            border: '3px dashed #a855f7',
            borderRadius: '8px',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              padding: '1.5rem 2rem',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            }}
          >
            <div style={{fontSize: '16px', fontWeight: 600, color: '#a855f7', textAlign: 'center'}}>
              여기에 비디오를 놓으세요
            </div>
            <div style={{fontSize: '13px', color: '#64748b', textAlign: 'center', marginTop: '4px'}}>
              여러 개 동시 업로드 가능
            </div>
          </div>
        </div>
      )}

      {/* 업로드 진행 상태 표시 */}
      {uploading && (
        <div
          style={{
            padding: '12px 16px',
            marginBottom: '12px',
            backgroundColor: '#faf5ff',
            border: '1px solid #e9d5ff',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <div
            style={{
              width: '20px',
              height: '20px',
              border: '2px solid #a855f7',
              borderTopColor: 'transparent',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }}
          />
          <span style={{fontSize: '14px', color: '#7e22ce', fontWeight: 500}}>
            업로드 중... {uploadProgress}
          </span>
        </div>
      )}

      {/* 빈 상태일 때 큰 드롭존 */}
      {isEmpty && !uploading && (
        <div
          onClick={handleClick}
          style={{
            minHeight: '160px',
            border: '2px dashed #cbd5e1',
            borderRadius: '8px',
            backgroundColor: '#f8fafc',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            marginBottom: '1rem',
            gap: '0.5rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          <div style={{fontSize: '32px', marginBottom: '8px'}}>🎥</div>
          <div style={{fontSize: '14px', fontWeight: 500, color: '#64748b', textAlign: 'center'}}>
            비디오를 드래그 앤 드롭하거나 클릭하여 업로드하세요
          </div>
          <div style={{fontSize: '12px', color: '#94a3b8', textAlign: 'center'}}>
            여러 개를 한 번에 선택할 수 있습니다
          </div>
        </div>
      )}

      {/* 비디오가 있을 때 작은 추가 업로드 버튼 */}
      {!isEmpty && !uploading && (
        <div
          onClick={handleClick}
          style={{
            padding: '12px 16px',
            marginBottom: '12px',
            backgroundColor: '#f8fafc',
            border: '2px dashed #e2e8f0',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#faf5ff'
            e.currentTarget.style.borderColor = '#a855f7'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#f8fafc'
            e.currentTarget.style.borderColor = '#e2e8f0'
          }}
        >
          <span style={{fontSize: '18px'}}>➕</span>
          <span style={{fontSize: '14px', fontWeight: 500, color: '#64748b'}}>
            비디오 추가 (드래그 앤 드롭 또는 클릭)
          </span>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="video/*"
        multiple
        style={{display: 'none'}}
        onChange={handleFileInputChange}
      />

      {/* 기본 Sanity 배열 렌더링 (이미 업로드된 비디오들) */}
      {props.renderDefault(props)}

      {/* 스피너 애니메이션용 CSS */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

