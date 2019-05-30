export function getFileNameExtension(fileName: string): string | null {
  const fileNameParts: string[] = fileName.split('.');
  const fileExtension: string = fileNameParts[fileNameParts.length - 1];
  return fileExtension || null;
}

export function getBase64ImageType(base64String: string): string | null {
  return base64String.substring('data:image/'.length, base64String.indexOf(';base64')) || null;
}
