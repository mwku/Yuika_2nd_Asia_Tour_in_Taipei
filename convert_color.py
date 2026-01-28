from PIL import Image
import sys

def convert_black_to_color(input_path, output_path, target_color="#829ab6", threshold=50):
    """
    只保留黑色部分，並將黑色轉換為指定顏色
    
    參數:
        input_path: 輸入圖片路徑
        output_path: 輸出圖片路徑
        target_color: 目標顏色 (hex格式，例如 "#829ab6")
        threshold: 黑色閾值，RGB值都小於此值才算黑色 (0-255)
    """
    # 將 hex 顏色轉換為 RGB
    target_color = target_color.lstrip('#')
    r_target = int(target_color[0:2], 16)
    g_target = int(target_color[2:4], 16)
    b_target = int(target_color[4:6], 16)
    
    # 開啟圖片
    img = Image.open(input_path)
    
    # 轉換為 RGBA 模式（支援透明）
    img = img.convert('RGBA')
    
    # 獲取像素數據
    pixels = img.load()
    width, height = img.size
    
    # 遍歷每個像素
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            
            # 如果是黑色（RGB 值都小於閾值）
            if r <= threshold and g <= threshold and b <= threshold:
                # 轉換為目標顏色
                pixels[x, y] = (r_target, g_target, b_target, 255)
            else:
                # 其他顏色變成透明
                pixels[x, y] = (255, 255, 255, 0)
    
    # 保存為 PNG（支援透明）
    img.save(output_path, 'PNG')
    print(f'✓ 已處理: {input_path} -> {output_path}')

# 使用範例
if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("使用方式:")
        print("  python convert_color.py <輸入圖片> [輸出圖片] [顏色] [閾值]")
        print("\n範例:")
        print("  python convert_color.py input.jpg")
        print("  python convert_color.py input.jpg output.png")
        print("  python convert_color.py input.jpg output.png #ff0000")
        print("  python convert_color.py input.jpg output.png #829ab6 60")
    else:
        input_file = sys.argv[1]
        output_file = sys.argv[2] if len(sys.argv) > 2 else input_file.rsplit('.', 1)[0] + '_converted.png'
        color = sys.argv[3] if len(sys.argv) > 3 else "#829ab6"
        thresh = int(sys.argv[4]) if len(sys.argv) > 4 else 50
        
        convert_black_to_color(input_file, output_file, color, thresh)
