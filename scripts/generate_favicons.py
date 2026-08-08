import os
from PIL import Image, ImageEnhance, ImageDraw

def create_favicons():
    # Paths
    base_dir = r"c:\Users\windows11\OneDrive\Documents\Synk IN Website\public"
    source_path = os.path.join(base_dir, "avatar.jpg")
    
    if not os.path.exists(source_path):
        print(f"Source image not found: {source_path}")
        return

    # Open image
    img = Image.open(source_path).convert("RGBA")
    
    # Get dimensions
    width, height = img.size
    
    # Calculate crop box (tight center crop, slightly shifted up for typical portrait)
    # Target square size: min dimension
    size = min(width, height)
    
    # Assuming face is slightly above center, let's crop a square
    # We want to crop tightly around the center.
    crop_size = int(size * 0.6) # crop 60% of the min dimension to zoom in on face
    
    left = (width - crop_size) // 2
    top = int((height - crop_size) * 0.3) # 30% from top instead of 50%
    right = left + crop_size
    bottom = top + crop_size
    
    cropped = img.crop((left, top, right, bottom))
    
    # Enhance contrast and sharpness
    enhancer_contrast = ImageEnhance.Contrast(cropped)
    cropped = enhancer_contrast.enhance(1.2) # +20% contrast
    
    enhancer_sharpness = ImageEnhance.Sharpness(cropped)
    cropped = enhancer_sharpness.enhance(1.5) # +50% sharpness
    
    # Create circular mask for premium look
    mask = Image.new('L', (crop_size, crop_size), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0, crop_size, crop_size), fill=255)
    
    # Apply mask
    final_img = Image.new('RGBA', (crop_size, crop_size), (0, 0, 0, 0))
    final_img.paste(cropped, (0, 0), mask)
    
    # Sizes to generate
    sizes = {
        "favicon-16x16.png": (16, 16),
        "favicon-32x32.png": (32, 32),
        "apple-touch-icon.png": (180, 180),
        "android-chrome-192x192.png": (192, 192),
        "android-chrome-512x512.png": (512, 512)
    }
    
    for filename, dim in sizes.items():
        resized = final_img.resize(dim, Image.Resampling.LANCZOS)
        out_path = os.path.join(base_dir, filename)
        resized.save(out_path, format="PNG")
        print(f"Generated {filename}")
        
    # Generate favicon.ico (includes multiple sizes)
    icon_sizes = [(16,16), (32,32), (48,48)]
    ico_img = final_img.resize((256, 256), Image.Resampling.LANCZOS)
    ico_path = os.path.join(base_dir, "favicon.ico")
    ico_img.save(ico_path, format="ICO", sizes=icon_sizes)
    print(f"Generated favicon.ico")

if __name__ == "__main__":
    create_favicons()
