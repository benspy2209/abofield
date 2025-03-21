
#!/bin/bash

# Check if the jpeg file exists
if [ -f "public/logo_abofield.jpeg" ]; then
  # Try to use cwebp if available
  if command -v cwebp &> /dev/null; then
    cwebp -q 80 public/logo_abofield.jpeg -o public/logo_abofield.webp
    echo "Converted logo to WebP format using cwebp"
  # Try to use ImageMagick if available
  elif command -v convert &> /dev/null; then
    convert public/logo_abofield.jpeg -quality 80 public/logo_abofield.webp
    echo "Converted logo to WebP format using ImageMagick"
  else
    echo "Error: Neither cwebp nor ImageMagick are installed."
    echo "Please install one of these tools or manually convert the logo to WebP format."
  fi
else
  echo "Error: Logo file not found at public/logo_abofield.jpeg"
fi
