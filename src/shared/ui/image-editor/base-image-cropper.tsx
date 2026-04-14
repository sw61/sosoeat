'use client';

import type { CropperProps } from 'react-easy-crop';
import Cropper from 'react-easy-crop';

const defaultCropperStyle: CropperProps['style'] = {
  containerStyle: {
    backgroundColor: '#ffffff',
  },
  cropAreaStyle: {
    color: 'rgba(0, 0, 0, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.9)',
  },
};

type BaseImageCropperProps = {
  image?: CropperProps['image'];
  video?: CropperProps['video'];
  crop: CropperProps['crop'];
  zoom: CropperProps['zoom'];
  aspect: CropperProps['aspect'];
  cropShape?: CropperProps['cropShape'];
  showGrid?: CropperProps['showGrid'];
  objectFit?: CropperProps['objectFit'];
  onCropChange: CropperProps['onCropChange'];
  onZoomChange?: CropperProps['onZoomChange'];
  onCropComplete?: CropperProps['onCropComplete'];
  onCropAreaChange?: CropperProps['onCropAreaChange'];
  onMediaLoaded?: CropperProps['onMediaLoaded'];
  classes?: CropperProps['classes'];
  style?: CropperProps['style'];
  cropperProps?: CropperProps['cropperProps'];
  mediaProps?: CropperProps['mediaProps'];
};

export function BaseImageCropper({ style, ...props }: BaseImageCropperProps) {
  return (
    <Cropper
      {...props}
      style={{
        ...defaultCropperStyle,
        ...style,
        containerStyle: {
          ...defaultCropperStyle.containerStyle,
          ...style?.containerStyle,
        },
        mediaStyle: {
          ...defaultCropperStyle.mediaStyle,
          ...style?.mediaStyle,
        },
        cropAreaStyle: {
          ...defaultCropperStyle.cropAreaStyle,
          ...style?.cropAreaStyle,
        },
      }}
    />
  );
}
