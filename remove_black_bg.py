from PIL import Image, ImageDraw
import sys

def remove_black_background(input_path, output_path, threshold=10):
    try:
        img = Image.open(input_path)
        img = img.convert("RGBA")
        datas = img.getdata()
        
        # Simple color replacement strategy first, but flood fill is safer for internal blacks.
        # However, PIL's floodfill is part of ImageDraw.
        # Let's try a simple approach: if top-left is black, use floodfill.
        
        width, height = img.size
        
        # Check top-left pixel
        tl_pixel = img.getpixel((0, 0))
        # Assuming black is close to (0,0,0)
        is_black = sum(tl_pixel[:3]) < threshold * 3
        
        if is_black:
            print("Detected black background. Attempting flood fill...")
            # ImageDraw.floodfill requires a mutable image
            # We want to fill with (0,0,0,0) - fully transparent
            # But ImageDraw.floodfill works on the image in place
            
            # Since we want to make it transparent, we can just use the floodfill 
            # to mark the background, then set alpha. 
            # Actually, let's just use a dedicated flood fill from corners.
            
            # Create a mask initialized to 0
            mask = Image.new('L', (width, height), 0)
            
            # We will use a separate flood fill on a binary version of the image to find the background
            # Convert to grayscale
            gray = img.convert('L')
            # Threshold to binary: black background (0) vs object (>0)
            # This is risky if object is dark.
            
            # Better approach: precise flood fill on the RGBA image
            # We can use a queue-based flood fill in python (slow) or try to use PIL features.
            
            # Alternative: "ImageDraw.floodfill"
            # Repalce black background with a specific "magic color" (e.g. magenta) that doesn't exist in image
            # Then replace magenta with transparent.
            
            magic_color = (255, 0, 255, 0) # Transparent magenta? No, just Transparent.
            
            # Flood fill from all 4 corners to be safe (if isolated)
            ImageDraw.floodfill(img, (0, 0), magic_color, thresh=threshold)
            ImageDraw.floodfill(img, (width-1, 0), magic_color, thresh=threshold)
            ImageDraw.floodfill(img, (0, height-1), magic_color, thresh=threshold)
            ImageDraw.floodfill(img, (width-1, height-1), magic_color, thresh=threshold)
            
            img.save(output_path, "PNG")
            print(f"Successfully saved transparent image to {output_path}")
        else:
            print("Top-left pixel is not black. Content might not have a black background?")
            # Force save anyway as png?
            img.save(output_path, "PNG")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    remove_black_background(
        "frontend/public/img/home_products/secado.jpg",
        "frontend/public/img/home_products/secado.png"
    )
