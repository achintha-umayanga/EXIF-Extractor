import React from 'react';

interface MetaDataDisplayProps {
  meta: Record<string, unknown> | null;
}

const sectionStyle: React.CSSProperties = {
  marginBottom: 24,
  padding: 16,
  borderRadius: 8,
  background: '#f5f5f5',
  color: '#111',
  boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
};

const headingStyle: React.CSSProperties = {
  marginBottom: 8,
  fontSize: 20,
  fontWeight: 600,
  color: '#222',
};

function renderSection(title: string, data: Record<string, unknown> | null) {
  if (!data || Object.keys(data).length === 0) return null;
  return (
    <section style={sectionStyle}>
      <div style={headingStyle}>{title}</div>
      <table style={{ width: '100%', fontSize: 15 }}>
        <tbody>
          {Object.entries(data).map(([key, value]) => (
            <tr key={key}>
              <td style={{ fontWeight: 500, paddingRight: 12 }}>{key}</td>
              <td>{typeof value === 'object' ? JSON.stringify(value) : String(value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

const MetaDataDisplay: React.FC<MetaDataDisplayProps> = ({ meta }) => {
  if (!meta) return null;
  if ('error' in meta) return <div>{meta.error as string}</div>;

  // Categorize metadata
  const fileInfo: Record<string, unknown> = {};
  const exifData: Record<string, unknown> = {};
  const gpsInfo: Record<string, unknown> = {};
  const cameraSettings: Record<string, unknown> = {};
  const additionalData: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(meta)) {
    if ([
      'Name', 'FileName', 'fileName', 'FileType', 'fileType', 'FileSize', 'fileSize', 'ImageWidth', 'ImageHeight', 'PixelXDimension', 'PixelYDimension', 'Orientation', 'lastModified', 'lastModifiedDate', 'MimeType', 'type', 'size', 'width', 'height', 'AspectRatio', 'ColorDepth', 'Format', 'format', 'Dimensions', 'ResolutionUnit', 'Resolution', 'XResolution', 'YResolution', 'ComponentsConfiguration'
    ].includes(key)) {
      fileInfo[key] = value;
    } else if ([
      'Make', 'Model', 'Software', 'ExifVersion', 'DateTimeOriginal', 'DateTimeDigitized', 'DateTime', 'FlashpixVersion', 'ColorSpace', 'YCbCrPositioning', 'SceneCaptureType', 'ExposureProgram', 'MeteringMode', 'WhiteBalance', 'ExposureMode', 'Flash', 'FocalLength', 'ExposureTime', 'ApertureValue', 'ShutterSpeedValue', 'BrightnessValue', 'ExposureBias', 'SubjectArea', 'MakerNote', 'ComponentsConfiguration', 'SensingMethod', 'SubSecTime', 'SubSecTimeOriginal', 'SubSecTimeDigitized', 'ISOSpeedRatings', 'ISOSpeed', 'ISOSpeedLatitudeyyy', 'ISOSpeedLatitudezzz', 'LightSource', 'Saturation', 'Sharpness', 'Contrast', 'CustomRendered', 'DigitalZoomRatio', 'FocalLengthIn35mmFilm', 'GainControl', 'MaxApertureValue', 'UserComment', 'FileSource', 'SceneType', 'CFAPattern', 'DeviceSettingDescription', 'ImageUniqueID', 'GPSProcessingMethod', 'GPSAreaInformation', 'GPSDateStamp', 'GPSDifferential', 'GPSHPositioningError', 'GPSImgDirection', 'GPSImgDirectionRef', 'GPSLatitude', 'GPSLatitudeRef', 'GPSLongitude', 'GPSLongitudeRef', 'GPSMapDatum', 'GPSMeasureMode', 'GPSProcessingMethod', 'GPSSatellites', 'GPSSpeed', 'GPSSpeedRef', 'GPSStatus', 'GPSTimeStamp', 'GPSVersionID', 'GPSAltitude', 'GPSAltitudeRef', 'GPSDestBearing', 'GPSDestBearingRef', 'GPSDestDistance', 'GPSDestDistanceRef', 'GPSDestLatitude', 'GPSDestLatitudeRef', 'GPSDestLongitude', 'GPSDestLongitudeRef', 'GPSDifferential', 'GPSDOP', 'GPSHPositioningError', 'GPSMapDatum', 'GPSMeasureMode', 'GPSSatellites', 'GPSSpeed', 'GPSSpeedRef', 'GPSStatus', 'GPSTrack', 'GPSTrackRef', 'GPSVersionID'
    ].includes(key)) {
      exifData[key] = value;
    } else if (key.startsWith('GPS') || ['latitude', 'longitude', 'altitude', 'gps', 'GPS'].includes(key)) {
      gpsInfo[key] = value;
    } else if ([
      'FNumber', 'ExposureTime', 'FocalLength', 'Flash', 'WhiteBalance', 'ExposureMode', 'ExposureProgram', 'SceneCaptureType', 'ApertureValue', 'ShutterSpeedValue', 'BrightnessValue', 'ExposureBias', 'MeteringMode', 'ISOSpeedRatings', 'ISOSpeed', 'ISOSpeedLatitudeyyy', 'ISOSpeedLatitudezzz', 'LightSource', 'Saturation', 'Sharpness', 'Contrast', 'CustomRendered', 'DigitalZoomRatio', 'FocalLengthIn35mmFilm', 'GainControl', 'MaxApertureValue', 'UserComment', 'FileSource', 'SceneType', 'CFAPattern', 'DeviceSettingDescription', 'ImageUniqueID'
    ].includes(key)) {
      cameraSettings[key] = value;
    } else {
      additionalData[key] = value;
    }
  }

  return (
    <div>
      {renderSection('File Information', fileInfo)}
      {renderSection('EXIF Data', exifData)}
      {renderSection('GPS Information', gpsInfo)}
      {renderSection('Camera Settings', cameraSettings)}
      {renderSection('Additional Data', additionalData)}
    </div>
  );
};

export default MetaDataDisplay; 