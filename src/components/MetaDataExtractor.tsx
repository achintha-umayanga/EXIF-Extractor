import { useEffect } from 'react';
import * as exifr from 'exifr';

interface MetaDataExtractorProps {
  file: File | null;
  onExtracted: (meta: Record<string, unknown>) => void;
}

const MetaDataExtractor: React.FC<MetaDataExtractorProps> = ({ file, onExtracted }) => {
  useEffect(() => {
    const extract = async () => {
      if (file) {
        try {
          const meta = await exifr.parse(file, { tiff: true, exif: true, gps: true, icc: true, xmp: true });
          onExtracted(meta as Record<string, unknown>);
        } catch {
          onExtracted({ error: 'Failed to extract metadata' });
        }
      }
    };
    extract();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);
  return null;
};

export default MetaDataExtractor;

